import { FC, useEffect } from 'react';
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../ui/dialog';
import { BaseDialog } from '../BaseDialog';
import {
  NumberInputField,
  NumberInputRoot,
} from '../ui/number-input';
import { SelectItem,  SelectValueText, SelectTrigger, SelectContent } from '../ui/select';

import { Fieldset,  Input,  Select,  Stack,  Textarea,  createListCollection} from '@chakra-ui/react';
import { Button } from '../ui/button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { IProduct, UpdateProductRequest } from '../../interfaces';

import { productSchema } from '../../validation';
import  {ProductFormData}  from '../../interfaces'
import { Radio, RadioGroup } from '../ui/radio';
import { urlToFile } from '../../utils';
import { useUploadFileMutation } from '../../app/services/apiSlice';

interface ProductEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product?: IProduct;
  onSubmit: (data: UpdateProductRequest) => Promise<void>;
  Categories: string[];
}



export const ProductEditDialog: FC<ProductEditDialogProps> = ({
  isOpen,
  onClose,
  product,
  onSubmit,
  Categories,
}) => {

  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
    reset
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      title: '',
      description:'',
      price: 0,
      discount: 0,
      category: [''],
      thumbnailType: 'url',
      thumbnail: undefined,
    }
  });
  
  useEffect(() => {
    if (isOpen) {
      reset({
        title: product?.title || '',
        description: product?.description || '',
        price: product?.price || 0,
        category: product?.category?.title ? [product.category.title] : [],
        discount: product?.discount || 0,
        thumbnailType: 'url',
        thumbnail: undefined,
      });
    }
  }, [product, isOpen, reset]);

  const categoriesCollection = createListCollection({
    items: Categories.map((category: string) => ({ value: category }))
  });
  const thumbnailType = watch('thumbnailType');

  const [uploadFile] = useUploadFileMutation();

  const onFormSubmit = async (formData: ProductFormData) => {

    if (!product?.documentId) return;

    try {
      let fileId: string | undefined;
  
      // Step 1: Handle file upload if needed
      if (formData.thumbnail) {
        let file: File;
        if (formData.thumbnailType === 'url' && typeof formData.thumbnail === 'string') {
          file = await urlToFile(formData.thumbnail, 'thumbnail.jpg');
        } else if (formData.thumbnail instanceof File) {
          file = formData.thumbnail;
        } else {
          throw new Error('Invalid thumbnail');
        }
  
        const [uploadedFile] = await uploadFile(file).unwrap();
        fileId = uploadedFile.id;
      }
  
      // Step 2: Update product with optional file reference
      const requestData: UpdateProductRequest = {
        documentId: product.documentId,
        data: {
          title: formData.title,
          description: formData.description,
          price: formData.price,
          discount: formData.discount,
          category: { title: formData.category?.[0] ?? '' },
          ...(fileId && { thumbnail: fileId }),
        },
      };
  
      await onSubmit(requestData)
      onClose();
    } catch (error) {
      console.error('Failed to update product:', error);
    }
    

  };


  return (
    <BaseDialog open={isOpen} onClose={onClose}>
        <DialogHeader>
          <DialogTitle>
            {product ? 'Edit Product' : 'Add Product'}
          </DialogTitle>
          <DialogDescription>
            Make changes to product information here
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          
        <Stack gap={4}>
          <Fieldset.Root invalid={!!errors.title}>
            <Fieldset.Legend>Title</Fieldset.Legend>
            <Input {...register('title')} />
            <Fieldset.ErrorText>{errors.title?.message}</Fieldset.ErrorText>
          </Fieldset.Root>

          <Fieldset.Root invalid={!!errors.description}>
            <Fieldset.Legend>Description</Fieldset.Legend>
            <Textarea {...register('description')}  />
            <Fieldset.ErrorText>{errors.description?.message}</Fieldset.ErrorText>
          </Fieldset.Root>

          <Fieldset.Root invalid={!!errors.price}>
            <Fieldset.Legend>Price</Fieldset.Legend>
            <NumberInputRoot min={0}>
              <NumberInputField {...register('price')} />
            </NumberInputRoot>
            <Fieldset.ErrorText>{errors.price?.message}</Fieldset.ErrorText>
          </Fieldset.Root>

          <Fieldset.Root invalid={!!errors.discount}>
            <Fieldset.Legend>Discount</Fieldset.Legend>
            <NumberInputRoot min={0}>
              <NumberInputField {...register('discount')} />
            </NumberInputRoot>
            <Fieldset.ErrorText>{errors.discount?.message}</Fieldset.ErrorText>
          </Fieldset.Root>

          <Fieldset.Root invalid={!!errors.category}>
            <Fieldset.Legend>Category</Fieldset.Legend>
            <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select.Root name={field.name}
            value={field.value}
            onValueChange={({ value }) => field.onChange(value)}
            onInteractOutside={() => field.onBlur()}
            collection={categoriesCollection}
            zIndex={1600}
            >
               <SelectTrigger>
                <SelectValueText placeholder="Select Category" />
              </SelectTrigger>  
              <SelectContent zIndex={1600}>
              {categoriesCollection.items.map((category) => (
                <SelectItem key={category.value} item={category}>
                  {category.value}
                </SelectItem>
              ))}
            </SelectContent>
            </Select.Root>
          )}
        />
            <Fieldset.ErrorText>{errors.category?.message}</Fieldset.ErrorText>
          </Fieldset.Root>

          <Fieldset.Root invalid={!!errors.thumbnailType}>
            <Fieldset.Legend>Thumbnail</Fieldset.Legend>
            <Controller
              name="thumbnailType"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => {
                    field.onChange(value);

                  }}
                >
                  <Stack direction="row" gap={4}>
                    <Radio
                      value="url"
                      inputProps={{ onBlur: field.onBlur }}
                    >
                      URL
                    </Radio>
                    <Radio
                      value="file"
                      inputProps={{ onBlur: field.onBlur }}
                    >
                      File Upload
                    </Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
            
            {errors.thumbnailType && (
              <Fieldset.ErrorText>
                {errors.thumbnailType?.message}
              </Fieldset.ErrorText>
            )}
          </Fieldset.Root>

          {/* Conditional Input based on selection */}
          {thumbnailType === 'url' ? (
            <Fieldset.Root invalid={!!errors.thumbnail}>
              <Fieldset.Legend>Image URL</Fieldset.Legend>
              <Input {...register('thumbnail')} placeholder="Enter image URL" />
              <Fieldset.ErrorText>{errors.thumbnail?.message}</Fieldset.ErrorText>
            </Fieldset.Root>
          ) : (
            <Fieldset.Root invalid={!!errors.thumbnail}>
              <Fieldset.Legend>Upload Image</Fieldset.Legend>
              <Input type="file" {...register('thumbnail')} accept="image/*" />
              <Fieldset.ErrorText>{errors.thumbnail?.message}</Fieldset.ErrorText>
            </Fieldset.Root>
          )}
        </Stack>


          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
    </BaseDialog>
  );
};
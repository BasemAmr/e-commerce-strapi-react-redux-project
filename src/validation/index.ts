import * as yup from 'yup';
import { isValidImageFile } from '../utils';

// Login validation schema
export const loginSchema = yup.object().shape({
    identifier: yup
        .string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

// Register validation schema
export const registerSchema = yup.object().shape({
    username: yup
        .string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
    email: yup
        .string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        )
        .required('Password is required'),
});




// Product validation schema


export const productSchema = yup.object().shape({
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  price: yup.number().required('Price is required').positive('Price must be positive'),
  discount: yup.number().min(0, 'Discount cannot be negative').max(100, 'Discount cannot exceed 100%').optional(),
  category: yup.array().of(yup.string().required()).optional(),
  thumbnailType: yup.string().oneOf(['url', 'file']).required('Thumbnail type is required'),
  thumbnail: yup.mixed<string | File>().when('thumbnailType', {
    is: 'url',
    then: () => yup.string().optional().defined().url('Must be a valid URL'),
    otherwise: () => yup.mixed().optional()
      .test("is-valid-type", "Not a valid image type",
         value =>{ 
          console.log(value)
          return value ? (value instanceof File) && isValidImageFile(value)  : true})
      .transform((value) => {
        if (value instanceof FileList) return value[0];
        return value;
      })
  }).optional()
});


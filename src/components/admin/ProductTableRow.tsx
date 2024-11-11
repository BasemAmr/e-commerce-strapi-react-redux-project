import { FC } from 'react';
import { IProduct } from '../../interfaces';
import { TableRow, TableCell, Image } from '@chakra-ui/react';
import { ProductTableActions } from './ProductTableActions';

interface Props {
  product: IProduct;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}


export const ProductTableRow: FC<Props> = ({ product, onView, onEdit, onDelete }) => (
  <TableRow>
    <TableCell>{product.id}</TableCell>
    <TableCell>{product.title}</TableCell>
    <TableCell>{product.description}</TableCell>
    <TableCell>{product.price}</TableCell>
    <TableCell>{product.stock}</TableCell>
    <TableCell>{product.discount}</TableCell>
    <TableCell>{product.category.title}</TableCell>
    <TableCell>
      <Image 
        src={ `${import.meta.env.VITE_SERVER_URL}${product.thumbnail.url}` } 
        alt={product.thumbnail.alternativeText} 
        boxSize="50px" 
        objectFit="cover"
        />
    </TableCell>

    <TableCell>
      <ProductTableActions
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </TableCell>
  </TableRow>
);
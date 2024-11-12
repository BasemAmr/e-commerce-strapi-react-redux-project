import { ColumnDef } from '../interfaces/index';
// config/tableConfigs.ts
import { IProduct, AuthUser } from '../interfaces';
import { Image } from '@chakra-ui/react';

export const productColumns: ColumnDef<IProduct>[] = [
  {
    key: 'title',
    label: 'Title'
  },
  {
    key: 'price',
    label: 'Price',
    render: (value) => `$${value.toFixed(2)}`
  },
  {
    key: 'stock',
    label: 'Stock'
  },
  {
    key: 'discount',
    label: 'Discount',
    render: (value) => `${value}%`
  },
  {
    key: 'thumbnail',
    label: 'Image',
    render: (value) => value?.url ? (
      <Image 
        src={`${import.meta.env.VITE_SERVER_URL}${value.url}`} 
        alt={value.alternativeText}
        boxSize="50px"
        objectFit="cover"
      />
    ) : null
  }
];

export const userColumns: ColumnDef<AuthUser>[] = [
  {
    key: 'username',
    label: 'Username'
  },
  {
    key: 'email',
    label: 'Email'
  },
  {
    key: 'role',
    label: 'Role',
    render: (value) => value.type
  }
];
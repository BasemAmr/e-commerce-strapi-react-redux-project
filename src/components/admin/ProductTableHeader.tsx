import { FC } from 'react';
import { TableHeader, TableRow,TableColumnHeader } from '@chakra-ui/react';
import { ArrowUpDown } from 'lucide-react';

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

interface ProductTableHeaderProps {
  onSort?: (sortConfig: SortConfig) => void;
  currentSort?: SortConfig;
}

// interface IProduct {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   stock: number;
//   discount: number;
//   documentId: string;
//   category: ICategories;
//   thumbnail: IThumbnail;
// }


export const ProductTableHeader: FC<ProductTableHeaderProps> = ({
  onSort,
  currentSort
}) => {
  const handleSort = (key: string) => {
    if (!onSort) return;
    
    const direction = currentSort?.key === key && currentSort.direction === 'asc' 
      ? 'desc' 
      : 'asc';
    
    onSort({ key, direction });
  };

  return (
    <TableHeader>
      <TableRow>
        <TableColumnHeader cursor="pointer" onClick={() => handleSort('id')}>
          ID {currentSort?.key === 'id' && <ArrowUpDown size={16} />}
        </TableColumnHeader>
        <TableColumnHeader cursor="pointer" onClick={() => handleSort('title')}>
          Title {currentSort?.key === 'title' && <ArrowUpDown size={16} />}
        </TableColumnHeader>
        <TableColumnHeader cursor="pointer" onClick={() => handleSort('description')}>
          Description {currentSort?.key === 'description' && <ArrowUpDown size={16} />}
        </TableColumnHeader>
        <TableColumnHeader cursor="pointer" onClick={() => handleSort('price')}>
          Price {currentSort?.key === 'price' && <ArrowUpDown size={16} />}
        </TableColumnHeader>
        <TableColumnHeader cursor="pointer" onClick={() => handleSort('stock')}>
          Stock {currentSort?.key === 'stock' && <ArrowUpDown size={16} />}
        </TableColumnHeader>
        <TableColumnHeader cursor="pointer" onClick={() => handleSort('discount')}>
          Discount {currentSort?.key === 'discount' && <ArrowUpDown size={16} />}
        </TableColumnHeader>
        <TableColumnHeader cursor="pointer" onClick={() => handleSort('category')}>
          Category {currentSort?.key === 'category' && <ArrowUpDown size={16} />}
        </TableColumnHeader>
        <TableColumnHeader cursor="pointer">
          Thumbnail
        </TableColumnHeader>
        <TableColumnHeader>Actions</TableColumnHeader>
      </TableRow>
    </TableHeader>
  );
};
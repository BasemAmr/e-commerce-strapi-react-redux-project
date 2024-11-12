// components/DynamicTableRow.tsx
import { TableRow, TableCell } from '@chakra-ui/react';
import { ColumnDef } from '../../interfaces';
import { ProductTableActions } from './ProductTableActions';

interface DynamicTableRowProps<T> {
  data: T;
  columns: ColumnDef<T>[];
  actionTriggers: {
    onView?: () => void;
    onEdit: () => void;
    onDelete?: () => void;
  };
}

export const DashboardTableRow = <T extends object>({
  data,
  columns,
  actionTriggers
}: DynamicTableRowProps<T>) => {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell key={String(column.key)}>
          {column.render 
            ? column.render(data[column.key])
            : String(data[column.key])}
        </TableCell>
      ))}
      <TableCell>
        <ProductTableActions {...actionTriggers} />
      </TableCell>
    </TableRow>
  );
};
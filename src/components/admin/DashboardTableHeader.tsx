import { TableHeader, TableRow, TableColumnHeader } from '@chakra-ui/react';
import { ArrowUpDown } from 'lucide-react';
import { ColumnDef } from '../../interfaces';

interface DynamicTableHeaderProps<T> {
  columns: ColumnDef<T>[];
  onSort?: (key: keyof T) => void;
  currentSort?: {
    key: string;
    direction: 'asc' | 'desc'
  };
}

export const DashboardTableHeader = <T extends object>({ 
  columns,
  onSort,
  currentSort
}: DynamicTableHeaderProps<T>) => {
  return (
    <TableHeader>
      <TableRow>
        {columns.map((column) => (
          <TableColumnHeader
            key={String(column.key)}
            onClick={() => onSort?.(column.key)}
            cursor={onSort ? 'pointer' : 'default'}
          >
            {column.label}
            {onSort && <ArrowUpDown className="ml-2 h-4 w-4" />}
          </TableColumnHeader>
        ))}
        <TableColumnHeader>Actions</TableColumnHeader>
      </TableRow>
    </TableHeader>
  );
};
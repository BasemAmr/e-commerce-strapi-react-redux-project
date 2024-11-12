import { Table } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  AlertDialog } from '../AlertDialog'
import { useGetProductsQuery, useRemoveProductMutation, useUpdateProductMutation } from '../../app/services/apiSlice';
import { DashboardTableHeader } from './DashboardTableHeader';
import { DashboardTableRow } from './DashboardTableRow.tsx';
import { ErrorState } from './ErrorState';
import { IProduct, UpdateProductRequest } from '../../interfaces';
import DashboardTableSkeleton from './DashboardTableSkeleton';
import { ProductEditDialog } from './ProductEditDialog';
import { productColumns } from '../../data/tableConfig.tsx';

const DashboardProductsTable: FC = () => {
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(undefined);
  
  const navigate = useNavigate();
  
  
  const { data, isLoading, isError } = useGetProductsQuery({ 
    page, 
    pageSize: 10 
  });
  console.log(data)
  
  const [removeProduct] = useRemoveProductMutation();
  const [updateProduct] =  useUpdateProductMutation();
  
  if (isLoading) return <DashboardTableSkeleton />;
  if (isError) return <ErrorState onRetry={() => window.location.reload()} />;
  
  // Handle delete product
  const handleDelete = async (id: string) => {
    try {
      await removeProduct(id).unwrap();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  // Handle edit product
  const handleEdit = async (data: UpdateProductRequest) => {
    try {
      await updateProduct(data).unwrap();
      setSelectedProduct(undefined);
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };


  return (
    <>
      <Table.Root>
        <DashboardTableHeader 
          columns={productColumns}
          // onSort={handleSort}
          // currentSort={currentSort}
        />
        <Table.Body>
          {data?.data.map((product: IProduct) => (
            <DashboardTableRow
              key={product.id}
              data={product}
              columns={productColumns}
              actionTriggers={{
                onView: () => navigate(`/products/${product.documentId}`),
                onEdit: () => setSelectedProduct(product),
                onDelete: () => setSelectedId(product?.documentId),
              }}
            />
          ))}
        </Table.Body>
      </Table.Root>

      <AlertDialog
        open={!!selectedId}
        onClose={() => setSelectedId(undefined)}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={() => {
          if (selectedId) handleDelete(selectedId);
          setSelectedId(undefined);
        }}
      />

        

      <ProductEditDialog
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(undefined)}
        product={selectedProduct}
        onSubmit={handleEdit} 
        Categories={
          // Extract Unique categories from the products
          Array.from(new Set(data?.data.map((product: IProduct) => product.category.title)))
        }
      />
      
    </>
  );
};

export default DashboardProductsTable;
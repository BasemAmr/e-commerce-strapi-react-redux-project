import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  ProductResponse, UpdateProductRequest, UpdateProductResponse } from '../../interfaces';
import CookiesService from '../../services/cookies';

interface UploadResponse {
  id: string;
  url:  string;
}


export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, { page: number; pageSize: number }>({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: '/api/products',
        params: {
          populate: '*',
          'pagination[page]': page,
          'pagination[pageSize]': pageSize,
          'pagination[withCount]': true,
        },
        headers: {
          'Authorization': `Bearer ${CookiesService.getCookie('jwt')}`,
        },
        
      }),
      providesTags: (result) =>
        {
          console.log(result)
          
          return result
          ? [
              ...result.data.map(({ documentId }) => ({ type: 'Products' as const, documentId })),
              { type: 'Products', documentId: 'LIST' },
            ]
          : [{ type: 'Products', documentId: 'LIST' }]},
      
    }),
    
    removeProduct: builder.mutation<void, string>({
      query: (documentId) => ({
        url: `/api/products/${documentId}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${CookiesService.getCookie('jwt')}`,
        },
      }),
      // Optimistic updates
      onQueryStarted: async (documentId, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getProducts', { page: 1, pageSize: 10 }, (draft) => {
            draft.data = draft.data.filter((product) => product.documentId != documentId);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, documentId) => [{ type: 'Products', documentId }],
    }),

    // Update product with optimistic updates
        // apiSlice.ts
        uploadFile: builder.mutation<UploadResponse[], File>({
          query: (file) => {
            const formData = new FormData();
            formData.append('files', file);
            
            return {
              url: '/api/upload',
              method: 'POST',
              body: formData,
              headers: {
                'Authorization': `Bearer ${CookiesService.getCookie('jwt')}`,
              },
            };
          },
        }),
    
        // Product Update Endpoint
        updateProduct: builder.mutation<UpdateProductResponse, UpdateProductRequest>({
          query: ({ documentId, data }) => ({
            url: `/api/products/${documentId}`,
            method: 'PUT',
            body: { data },
            headers: {
              'Authorization': `Bearer ${CookiesService.getCookie('jwt')}`,
              'Content-Type': 'application/json',
            },
          }),
    
          // Optimistic Updates
          onQueryStarted: async ({ documentId, data }, { dispatch, queryFulfilled }) => {
            const patchResult = dispatch(
              apiSlice.util.updateQueryData('getProducts', 
              { page: 1, pageSize: 10 }, 
              (draft) => {
                const index = draft.data.findIndex(
                  (product) => product.documentId === documentId
                );
                if (index !== -1) {
                  draft.data[index] = {
                    ...draft.data[index],
                    ...data,
                  };
                }
              })
            );
    
            try {
              await queryFulfilled;
            } catch {
              patchResult.undo();
            }
          },
    
          invalidatesTags: (result, error, { documentId }) => 
            [{ type: 'Products', documentId }],
        }),
  }),
});
export const { useGetProductsQuery, useRemoveProductMutation, useUpdateProductMutation, useUploadFileMutation } = apiSlice;
export default apiSlice;
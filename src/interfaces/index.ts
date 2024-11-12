export interface ICategories {
  title: string;
}

interface IThumbnail {
  url: string;
  alternativeText: string;
}

export interface IProduct {
  id?: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  discount: number;
  documentId?: string;
  category: ICategories;
  thumbnail?: IThumbnail;
}

export interface IErrorResponse {
  error: {
    details?: {
      errors: {
        message: string;
      }[];
    };
    message?: string;
  };
}

export interface RegisterFormFields {
  name: "email" | "username" | "password";
  label: string;
  type: "email" | "text" | "password";
  placeholder: string;
}

export interface LoginFormFields {
  name: "identifier" | "password";
  label: string;
  type: "email" | "password";
  placeholder: string;
}

// Alert Component Props
export interface BaseDialogProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export interface AlertDialogProps extends BaseDialogProps {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  variant?: "danger" | "warning" | "info";
}

// API Pagination and Response

export interface IPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ProductResponse {
  data: IProduct[];
  meta: {
    pagination: IPagination;
  };
}



export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  discount?: number;
  category?: string[];
  thumbnail?: File | string;
  thumbnailType: "url" | "file";
}

export interface UpdateProductRequest {
  documentId: string;
  data: {
    title: string;
    description: string;
    price: number;
    discount?: number;
    category: { title: string };
  };
  files?: {
    thumbnail?: File;
  };
}

export interface UpdateProductResponse {
  data: IProduct;
}

export type UserRole = 'admin' | 'authenticated' | 'guest';

export interface AuthUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
  role: {
    type: UserRole;
  }
}


// types/table.ts
export interface ColumnDef<T> {
  key: keyof T;
  label: string;
  render?: (value: any) => React.ReactNode;
}

export interface TableConfig<T> {
  columns: ColumnDef<T>[];
}
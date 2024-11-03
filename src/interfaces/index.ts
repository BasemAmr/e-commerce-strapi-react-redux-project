interface ICategories {
    title: string;
}

interface IThumbnail {
    url: string;
}

export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    discount: number;
    documentId: string;
    category: ICategories;
    thumbnail: IThumbnail;
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
    name: 'email' | 'username' | 'password';
    label: string;
    type: 'email' | 'text' | 'password';
    placeholder: string;
}


export interface LoginFormFields {
  name: 'identifier' |  'password';
  label: string;
  type: 'email' | 'password';
  placeholder: string;
}

interface CartItem {
    id: number;
    quantity: number;
}

export const findCartItem = (items: CartItem[], productId: number): CartItem | undefined => {
    return items.find((item) => item.id === productId);
};


export const urlToFile = async (url: string, filename: string): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
};
  
export const isValidImageFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return validTypes.includes(file.type);
};
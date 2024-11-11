import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../interfaces';
import { findCartItem } from '../../utils';

// Extended interface to include quantity
export interface ICartItem extends IProduct {
    quantity: number;
}

interface IInitialState {
    items: ICartItem[];
}

const initialState: IInitialState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<IProduct>) => {  
            const existingItem = findCartItem(state.items, action.payload.id);          
            if (existingItem) {
                // If item exists, increment quantity
                existingItem.quantity += 1;
            } else {
                // If item doesn't exist, add it with quantity 1
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeAllItems: (state, action: PayloadAction<{ id: number }>) => {
            state.items = state.items.filter((item) => item.id !== action.payload.id);
        },
        removeOneItem: (state, action: PayloadAction<{ id: number }>) => {
            const item = findCartItem(state.items, action.payload.id);          
            if (item) {
                item.quantity = Math.max(0, item.quantity - 1);
                // Remove item if quantity becomes 0
                if (item.quantity === 0) {
                    state.items = state.items.filter((item) => item.id !== action.payload.id);
                }
            }
        },
        updateQuantity: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
            const item = findCartItem(state.items, action.payload.id);          
            if (item) {
                item.quantity = Math.max(0, item.quantity + action.payload.quantity);
                // Remove item if quantity becomes 0
                if (item.quantity === 0) {
                    state.items = state.items.filter((item) => item.id !== action.payload.id);
                }
            }
        }
    },
});

export const { addItem, removeAllItems, removeOneItem, updateQuantity } = cartSlice.actions;
export default cartSlice;
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
    isOpenCartDrawer: boolean;
    openCartDrawer: () => void;
    closeCartDrawer: () => void;
}

const initialState: IInitialState = {
    isOpenCartDrawer: false,
    openCartDrawer: () => {},
    closeCartDrawer: () => {},
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        openCartDrawer: (state) => {
            state.isOpenCartDrawer = true;
        },
        closeCartDrawer: (state) => {
            state.isOpenCartDrawer = false;
        },
        isOpenCartDrawer: (state) => {
            state.isOpenCartDrawer = !state.isOpenCartDrawer;
        }
    },
});


export const { openCartDrawer, closeCartDrawer, isOpenCartDrawer } = globalSlice.actions;
export default globalSlice;
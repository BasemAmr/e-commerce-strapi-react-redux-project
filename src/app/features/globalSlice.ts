import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
    isOpenCartDrawer: boolean;
}

const initialState: IInitialState = {
    isOpenCartDrawer: false
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
    },
});

export const { openCartDrawer, closeCartDrawer } = globalSlice.actions;
export default globalSlice;
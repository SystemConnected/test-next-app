'use client'
import {createSlice,PayloadAction} from '@reduxjs/toolkit'

interface LayoutState {
    isOpenSidebar: boolean;
}

const initialState: LayoutState = {
    isOpenSidebar: false,
};

const layoutSlice = createSlice({
    name: 'layoutSlice',
    initialState,
    reducers: {
        setIsopenSidebar: (state, action:PayloadAction<boolean>) => {
            state.isOpenSidebar = action.payload;
        },
    },
});

export const {setIsopenSidebar} = layoutSlice.actions;
export default layoutSlice.reducer;


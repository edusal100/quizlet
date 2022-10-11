import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'category',
    initialState: [],
    reducers: {
        selectCategory: (state, action) => {
            state.category = action.payload;
        }
    }
})

export const {selectCategory} = categorySlice.actions

export default categorySlice.reducer
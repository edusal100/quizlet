import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: []
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        selectCategory: (state, action) => {
            return{
                ...action.payload
            }
        },
        clearCategory: (state) => {
            return [];
        }
    }
})

export const {selectCategory, clearCategory} = categorySlice.actions

export default categorySlice.reducer
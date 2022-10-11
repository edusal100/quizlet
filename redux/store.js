import categorySlice from "./categorySlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore ({
    reducer: {
        category: categorySlice
    }
})
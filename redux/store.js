import categorySlice from "./categorySlice";
import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./gameSlice";
import userSlice from "./userSlice";

export const store = configureStore ({
    reducer: {
        category: categorySlice,
        gameData: gameSlice,
        userData: userSlice,
    }
})
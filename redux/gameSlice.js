import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: 'gameData',
    initialState: {
        value: 0,
    },
    reducers: {
        updateScore: (state, action) => {
            state.value += action.payload;
        },
        resetScore: (state) => {
          state.value = 0
        }
    }
})

export const {updateScore, resetScore} = gameSlice.actions


export default gameSlice.reducer
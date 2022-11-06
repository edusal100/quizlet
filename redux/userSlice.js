import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: ""
    },
    reducers: {
        selectUser: (state, action) => {
            return{
                ...action.payload
            }
        },
        resetUser: (state) => {
            state.length = 0
          }
    }
})

export const {selectUser, resetUser} = userSlice.actions

export default userSlice.reducer
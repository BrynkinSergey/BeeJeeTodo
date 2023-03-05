import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogined: false
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setIsLogined: (state, action)=>{
            state.isLogined = action.payload;
        }
    },
})

export const { setIsLogined } = loginSlice.actions

export default loginSlice.reducer
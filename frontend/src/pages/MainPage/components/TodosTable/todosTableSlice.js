import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    page: 1,
    data: null,
    field: 'username',
    order: 'asc',
    isSending: false,
}

export const todosTableSlice = createSlice({
    name: 'todosTable',
    initialState,
    reducers: {
        incrementPage: (state) => {
            state.page += 1
        },
        decrementPage: (state) => {
            state.page -= 1
        },
        setData: (state, action)=> {
            state.data = action.payload;
        },
        setField: (state, action)=> {
            state.field = action.payload;
        },
        setOrder: (state, action)=> {
            state.order = action.payload;
        },
        setIsSending: (state, action)=>{
            state.isSending = action.payload;
        }
    },
})

export const { incrementPage, decrementPage, setData, setField, setOrder, setIsSending } = todosTableSlice.actions

export default todosTableSlice.reducer
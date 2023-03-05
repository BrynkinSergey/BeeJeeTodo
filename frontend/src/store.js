import { configureStore } from '@reduxjs/toolkit'
import todosTableSliceReducer from "./pages/MainPage/components/TodosTable/todosTableSlice";
import loginSliceReducer from "./loginSlice";

export const store = configureStore({
    reducer: {
        todosTable: todosTableSliceReducer,
        login: loginSliceReducer
    },
})
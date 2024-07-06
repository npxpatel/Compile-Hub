import {configureStore} from "@reduxjs/toolkit"
import compilerSlice from "./slices/compilerSlice"
import authReducer from './slices/authSlice';


export const store = configureStore({
    reducer : {
        compilerSlice : compilerSlice,
        auth : authReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;


import { configureStore } from '@reduxjs/toolkit';
import Reducer from './reducer'
import AlertSlice from './alertSlice';


export const store = configureStore({
    reducer:{
        app: Reducer,
        notifications: AlertSlice.reducer
    }
})
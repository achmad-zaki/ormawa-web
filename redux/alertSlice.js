import { createSlice } from "@reduxjs/toolkit"

export const AlertSlice = createSlice({
    name: "alert",
    initialState: {
        alerts: []
    },
    reducers: {
        createAlert: (state, action) => {
            state.alerts.push({
                message: action.payload.message,
                style: action.payload.style
            });
        }
    }
    // extraReducers: {
    //     [extraAction]: (state, action) => {
    //         state.alerts.push({message: action.error.message, style:'error'});
    //     }
    // }
});

export const actions = AlertSlice.actions;

export default AlertSlice;
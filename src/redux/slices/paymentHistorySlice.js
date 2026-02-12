import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    history: [],
    cuser: "",
}

const paymentHistorySlice = createSlice({
    name: "paymentHistory",
    initialState,
    reducers: {
        addHistory: (state, action) => {
            state.history.push(action.payload);
        },
        currentPaymentUser: (state, action) => {
            state.cuser = action.payload
        }
    }
})

export const { addHistory, currentPaymentUser } = paymentHistorySlice.actions;

export const selectPaymentHistoryByUser = (state, userId) =>
    state.paymentHistory.history.filter(h => h.userId === userId);

export default paymentHistorySlice.reducer;
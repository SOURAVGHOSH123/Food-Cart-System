import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   cartItems: [],
   totalQuantity: 0,
};

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addToCart: (state, action) => {
         state.cartItems.push(action.payload);
         state.totalQuantity += 1;
      },
   },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

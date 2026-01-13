import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//    wishItems: [],
//    totalQuantity: 0,
// };

// const wishSlice = createSlice({
//    name: "wish",
//    initialState,
//    reducers: {
//       addToWish: (state, action) => {
//          state.wishItems.push(action.payload)
//          state.totalQuantity += 1
//       },
//       deleteWish: (state, action) => {
//          state.wishItems = action.payload
//          state.totalQuantity -= 1
//       },
//       clearWishes: (state, action) => {
//          state.wishItems = state.wishItems.filter(i => i.id !== action.payload)
//          state.totalQuantity = 0
//       }
//    },
// });



const loadWishes = () => {
   const data = localStorage.getItem("wishItems")
   return data ? JSON.parse(data) : []
}

const initialState = {
   wishItems: loadWishes(),
   totalQuantity: loadWishes().length,
}

const wishSlice = createSlice({
   name: "wish",
   initialState,
   reducers: {
      addToWish: (state, action) => {
         const exists = state.wishItems.find(
            i =>
               i.userId === action.payload.userId &&
               i.productId === action.payload.productId
         )
         if (!exists) {
            state.wishItems.push(action.payload)
            state.totalQuantity++
            localStorage.setItem("wishItems", JSON.stringify(state.wishItems))
         }
      },

      deleteWish: (state, action) => {
         state.wishItems = state.wishItems.filter(
            i =>
               !(
                  i.userId === action.payload.userId &&
                  i.productId === action.payload.productId
               )
         )
         state.totalQuantity = state.wishItems.length
         localStorage.setItem("wishItems", JSON.stringify(state.wishItems))
      },

      clearWishes: (state, action) => {
         state.wishItems = state.wishItems.filter(i => i.userId !== action.payload)
         state.totalQuantity = state.wishItems.length
         localStorage.setItem("wishItems", JSON.stringify(state.wishItems))
      }
   }
})

export const { deleteWish, addToWish, clearWishes } = wishSlice.actions;
export default wishSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   reviews: [],
   totalReview: 0,
}

const reviewSlice = createSlice({
   name: "review",
   initialState,
   reducers: {
      setReviews: (state, action) => {
         state.reviews = [...action.payload]
         state.totalReview += 1
      },
      updateReview: (state, action) => {
         // console.log("index", action.payload)
         // console.log("reviewss", state.reviews)
         const { reviewid, userId, reaction } = action.payload
         const review = state.reviews.find(r => r.id === reviewid)
         if (!review) return;
         if (!review.reactions) {
            review.reactions = {};
         }
         if (review.reactions[userId] === reaction) {
            delete review.reactions[userId];
         } else {
            review.reactions[userId] = reaction;
         }
      },
      // deleteReview: (state, action) => {
      //    const { id } = action.payload

      //    state.reviews = 
      // }
   }
})

export const { setReviews, updateReview, deleteReview } = reviewSlice.actions
export default reviewSlice.reducer
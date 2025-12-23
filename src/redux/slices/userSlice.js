import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   users: [],              // all registered users
   currentUser: null,      // logged-in user
   isAuthenticated: false,  // authenticated
   resetMessage: "",       // message
}
// console.log(initialState.users, "these ar")

const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setUsers: (state, action) => {
         state.users = [...action.payload]
      },
      setResetMessage: (state, action) => {
         state.resetMessage = action.payload
      },
      setCurrentUser: (state, action) => {
         state.currentUser = action.payload
      },
      handleUsers: (state, action) => {
         const { cuser, newPassword } = action.payload
         state.users[cuser].password = newPassword;
      },
      logOutUser: (state) => {
         state.currentUser = null
         state.isAuthenticated = false
      },
      clearMessage: (state) => {
         state.resetMessage = ""
      }
   }
})

export const { handleUsers, setCurrentUser, setUsers, setResetMessage, clearMessage, logOutUser } = userSlice.actions
export default userSlice.reducer;
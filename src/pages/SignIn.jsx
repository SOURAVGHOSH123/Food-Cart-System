import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearMessage, setCurrentUser, setResetMessage } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

function SignIn() {
   let [info, setInfo] = useState({ email: "", password: "" })
   let [error, setError] = useState("")
   // let [message, setMessage] = useState("")
   // let message = useSelector((state) => state.auth.resetMessage)
   // let users = JSON.parse(localStorage.getItem("data"))
   let users = useSelector((state) => state.auth.users)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   // useEffect(() => {
   //    dispatch(clearMessage());
   // }, [])

   function handleSubmit(e) {
      e.preventDefault()
      const userExist = users.find((user) => {
         return user.email === info.email
      })
      // console.log(userExist, "exist")

      if (!info.email || !info.password) {
         setError("Please fill all fields.");
         return;
      }

      if (!userExist) {
         setError("User Doesn't Exist")
         return;
      }

      if (info.password !== userExist.password) {
         setError("Password Doesn't match.");
         return;
      }
      // localStorage.setItem("currentUser", JSON.stringify(info.email))
      dispatch(setCurrentUser(info.email))
      localStorage.setItem("token", Date.now())
      setError("")
      // setMessage("SignIn Successfuly")
      setInfo({ email: "", password: "" })
      navigate('/')
      // dispatch(setResetMessage("SignIn Successfuly"))
      toast.success("SignIn Successfuly")
      // window.location.href = "/"
   }

   return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
         <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">

            <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
               Welcome Back 👋
            </h1>

            {/* Error */}
            {error && (
               <p className="text-red-600 text-center mb-3 font-medium">
                  {error}
               </p>
            )}

            {/* Message */}
            {/* {message && (
               <p className="text-green-600 text-center mb-3 font-medium">
                  {message}
               </p>
            )} */}

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
               <input
                  type="email"
                  value={info.email}
                  placeholder="Email"
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                  className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-600"
               />

               <input
                  type="password"
                  value={info.password}
                  placeholder="Password"
                  onChange={(e) => setInfo({ ...info, password: e.target.value })}
                  className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-600"
               />
               <div>
                  <a href="/forgetPassword"
                     className="text-green-700 float-end font-semibold hover:text-red-500">
                     forget passsword ?
                  </a>
               </div>

               <button
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 
                  transition font-semibold"
               >
                  Login
               </button>

               <p className="text-center text-gray-600">
                  Don’t have an account?{" "}
                  <a href="/signup" className="text-green-700 font-semibold hover:underline">
                     SignUp
                  </a>
               </p>
            </form>
         </div>
      </div>
   );
}

export default SignIn;

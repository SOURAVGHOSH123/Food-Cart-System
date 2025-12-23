import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearMessage, setResetMessage, setUsers } from "../redux/slices/userSlice";

function Signup() {
   useEffect(() => {
      dispatch(clearMessage());
   }, [])

   // useEffect(() => {
   //    localStorage.setItem("user", JSON.stringify({ name: "Akshat " }));
   //    const user = JSON.parse(localStorage.getItem("user"));
   //    console.log(user, "useruser");
   //    localStorage.removeItem("user")
   //    localStorage.clear()
   // }, [])
   // const [otherData, setOtherData] = useState({
   //    name: "Sourav", age: 32, id: "23MCA20242"
   // })
   const navigate = useNavigate();
   // const [data, setData] = useState([]);
   const users = useSelector((state) => state.auth.users);
   const dispatch = useDispatch()
   console.log(users, "these are users")

   const [seenPass, setSeenPass] = useState(false)
   const [seenConfirm, setSeenConfirm] = useState(false)
   const [error, setError] = useState("")
   // const [message, setMessage] = useState("")
   // const message = useSelector((state) => state.auth.resetMessage)
   const [confirmPassword, setConfirmPassword] = useState("")
   const [information, setInformation] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
   })

   const handleSubmit = (e) => {
      e.preventDefault()
      // console.log(information);

      if (!information.name || !information.email || !information.password || !confirmPassword) {
         setError("Please fill all fields.");
         return;
      }

      if (information.password !== confirmPassword) {
         setError("Passwords do not match!");
         return;
      }

      const existUser = users.findIndex((item) => {
         return item.email === information.email
      })
      // console.log(existUser, "exist")

      if (existUser !== -1) {
         setError("User already exist with same email")
         return;
      }

      const newUsers = [...users, { ...information, id: uuid() }]
      dispatch(setUsers(newUsers))
      // localStorage.setItem("data", JSON.stringify(newUsers))
      // localStorage.setItem("currentUser", JSON.stringify(information.email))
      // localStorage.setItem("token", Date.now())
      setError("")
      // dispatch(setResetMessage("SignIn Successfuly"))
      toast.success("SignUp Successfuly")
      // setMessage("Signup Successfuly")
      setInformation({ name: "", email: "", password: "", confirmPassword: "" })
      navigate('/signin')
      // window.location.href = "/"   // used for refresh the page with action
   }
   // console.log(users, "users")
   // console.log(error, "error")

   return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
         <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">

            <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
               Create an Account 🍽️
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
                  type="text"
                  value={information.name}
                  onChange={(e) => setInformation({ name: e.target.value })}
                  placeholder="Full Name"
                  className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-600"
               />

               <input
                  type="email"
                  value={information.email}
                  onChange={(e) => setInformation({ ...information, email: e.target.value })}
                  placeholder="Email"
                  className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-600"
               />

               <div className="relative w-full">
                  <input
                     type={seenPass ? "text" : "password"}
                     value={information.password}
                     onChange={(e) =>
                        setInformation({ ...information, password: e.target.value })
                     }
                     placeholder="Password"
                     className="w-full border p-3 pr-12 rounded-lg outline-none focus:ring-2 focus:ring-green-600"
                  />

                  {/* Eye Icon */}
                  <span
                     className="absolute right-4 top-3 text-xl cursor-pointer text-gray-600 hover:text-gray-800"
                     onClick={() => setSeenPass(!seenPass)}
                  >
                     {!seenPass ? <IoEye /> : <IoEyeOff />}
                  </span>
               </div>

               <div className="relative w-full">
                  <input
                     type={seenConfirm ? "text" : "password"}
                     value={confirmPassword}
                     onChange={(e) =>
                        setConfirmPassword(e.target.value)
                     }
                     placeholder="Confirm Password"
                     className="w-full border p-3 pr-12 rounded-lg outline-none focus:ring-2 focus:ring-green-600"
                  />

                  {/* Eye Icon */}
                  <span
                     className="absolute right-4 top-3 text-xl cursor-pointer text-gray-600 hover:text-gray-800"
                     onClick={() => setSeenConfirm(!seenConfirm)}
                  >
                     {!seenConfirm ? <IoEye /> : <IoEyeOff />}
                  </span>
               </div>

               <button
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
               >Sign Up
               </button>

               <p className="text-center text-gray-600">
                  Already have an account?{" "}
                  <a href="/signin" className="text-green-700 font-semibold hover:underline">
                     Signin
                  </a>
               </p>
            </form>

            {/* <p className="p-2 text-center text-gray-800">
               <button type="button" onClick={() => navigate("/about", { state: otherData })}>
                  Go to about page </button>
            </p> */}

         </div>
      </div>
   );
}

export default Signup;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, logOutUser, setResetMessage } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

function Profile() {
   const navigate = useNavigate();
   const [user, setUser] = useState(null);
   const dispatch = useDispatch()
   const users = useSelector((state) => state.auth.users);
   const currentUser = useSelector((state) => state.auth.currentUser);

   useEffect(() => {
      dispatch(clearMessage())
      // const users = JSON.parse(localStorage.getItem("data"))
      // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      let userData = users.find((item) => {
         return item.email === currentUser
      })
      setUser(userData);
   }, []);

   // console.log(user, 'pfuser');

   function handleLogout() {
      // localStorage.removeItem("currentUser");
      dispatch(logOutUser())
      // dispatch(setResetMessage("Logout Sucessfully"))
      localStorage.removeItem("token");
      // navigate("/signin");
      window.location.href = "/signin"
      // toast.success("Logout Successfully")
   }

   // If no user → redirect to login
   if (!user) {
      return (
         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <p className="text-xl font-semibold text-red-600">
               No user logged in!
            </p>
            <button
               onClick={() => navigate("/signin")}
               className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
               Go to Login
            </button>
         </div>
      );
   }

   return (
      <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-5">
         <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
            <div className="flex flex-col items-center">
               <FaUserCircle className="text-green-600 mb-4" size={90} />

               <h2 className="text-3xl font-bold text-green-700 mb-2">
                  {user.name}
               </h2>

               <p className="text-gray-600 text-lg">{user.email}</p>
            </div>

            <hr className="my-6" />

            <div className="space-y-3 text-gray-700">
               <p className="text-lg">
                  <span className="font-semibold">Name: </span> {user.name}
               </p>

               <p className="text-lg">
                  <span className="font-semibold">Email: </span> {user.email}
               </p>

               <p className="text-lg">
                  <span className="font-semibold">Member Since: </span>
                  {new Date().toDateString()}
               </p>
            </div>

            <div className="mt-8 flex justify-between">
               <button
                  onClick={() => navigate("/")}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
               >
                  Home
               </button>

               <button
                  onClick={handleLogout}
                  className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
               >
                  Logout
               </button>
            </div>
         </div>
      </div>
   );
}

export default Profile;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, logOutUser } from "../redux/slices/userSlice";
import { truncate } from "../utils/truncate";

function Profile() {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { users, currentUser } = useSelector((state) => state.auth);
   const { history } = useSelector((state) => state.paymentHistory);
   // console.log(history, "his")

   const [user, setUser] = useState(null);

   useEffect(() => {
      dispatch(clearMessage());
      const userData = users.find((item) => item.email === currentUser);
      setUser(userData);
   }, [users, currentUser]);

   function handleLogout() {
      dispatch(logOutUser());
      localStorage.removeItem("token");
      window.location.href = "/signin";
   }

   if (!user) {
      return (
         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <p className="text-xl font-semibold text-red-600">
               No user logged in!
            </p>
            <button
               onClick={() => navigate("/signin")}
               className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg"
            >
               Go to Login
            </button>
         </div>
      );
   }

   // Filter only this user's orders
   const userOrders = history?.filter((item) => item.email === user.email) || [];

   const totalSpent = userOrders.reduce((acc, item) => acc + item.bills, 0);

   return (
      <div className="min-h-screen bg-gray-100 p-6">
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* LEFT PROFILE CARD */}
            <div className="bg-white shadow-xl rounded-2xl p-6">
               <div className="flex flex-col items-center text-center">
                  <FaUserCircle size={100} className="text-green-600 mb-4" />
                  <h2 className="text-2xl font-bold text-gray-800">
                     {user.name}
                  </h2>
                  <p className="text-gray-500">{user.email}</p>
               </div>

               <div className="mt-6 space-y-3 text-gray-700">
                  <p>
                     <span className="font-semibold">Member Since: </span>
                     {new Date().toDateString()}
                  </p>
                  {/* <p>
                     <span className="font-semibold">Total Orders: </span>
                     {userOrders.length}
                  </p>
                  <p>
                     <span className="font-semibold">Total Spent: </span>
                     ₹ {totalSpent.toFixed(2)}
                  </p> */}
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

            {/* RIGHT SIDE - ORDER HISTORY */}
            <div className="md:col-span-2 bg-white shadow-xl rounded-2xl md:p-6 p-4">
               <div className="flex justify-between gap-2">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">
                     Order History
                  </h2>

                  <p>
                     <span className="font-semibold">Times: </span>
                     {userOrders.length}
                  </p>
                  <p>
                     <span className="font-semibold">Spents: </span>
                     ₹ {totalSpent.toFixed(2)}
                  </p>
               </div>

               {userOrders.length === 0 ? (
                  <p className="text-gray-500">No orders yet.</p>
               ) : (
                  <div className="h-auto max-h-[60vh] md:max-h-[500px] overflow-y-auto pr-2 space-y-4 p-4">
                     {userOrders
                        .slice()
                        .reverse()
                        .map((order, index) => (
                           <div
                              key={index}
                              className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                           >
                              <div className="flex justify-between mb-2">
                                 <p className="font-semibold text-gray-800">
                                    Trans. ID: {order.transactionId}
                                 </p>
                                 <p className="text-green-600 font-bold">
                                    ₹ {order.bills}
                                 </p>
                              </div>

                              <p className="text-sm text-gray-500 mb-2">
                                 {new Date(order.timeStamp).toLocaleString()}
                              </p>

                              <div className="bg-gray-50 p-3 rounded-lg">
                                 {order.items.map((item, i) => (
                                    <div
                                       key={i}
                                       className="flex justify-between text-sm"
                                    >
                                       <span>
                                          {truncate(item.name, 15)} × {item.qty}
                                       </span>
                                       <span>
                                          ₹ {(item.price * item.qty).toFixed(2)}
                                       </span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        ))}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

export default Profile;

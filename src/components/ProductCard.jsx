import React, { useContext } from 'react'
import { LuEyeClosed } from "react-icons/lu";
import { truncate } from "../utils/truncate";
import IncrDecreItemComponent from './IncrDecreItemComponent'
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartProvider';
import { useSelector } from 'react-redux';

function ProductCard({ item }) {
   // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
   // const [cartItems, setCartItems] = useState([])
   const { addToCart, cartList } = useContext(CartContext)
   const currentUser = useSelector((state) => state.auth.currentUser)
   const existCartItem = cartList.find(p => item.id === p.id)
   const navigate = useNavigate()

   function handleCart(item) {
      if (!currentUser) {
         navigate('/signin')
         return;
      }
      addToCart(item)
   }
   return (
      <div
         key={item.id}
         className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl hover:scale-105 
                     transition cursor-pointer"
      >
         <img
            src={item.images?.[0]}
            alt={item.name}
            className="w-40 bg-green-300 rounded-full h-40 mx-auto mb-4"
         />

         <h2 className="text-xl font-semibold text-gray-800 text-center">
            {truncate(item.title)}
         </h2>

         <p className="text-center text-green-600 font-bold text-lg mt-2">
            ₹{item.price}
         </p>

         <div className="flex items-center gap-3 mt-5 w-full">
            {!existCartItem ? (
               <button
                  className="flex-1 py-2 bg-green-600 text-white rounded-lgtransition
                               hover:bg-green-700  disabled:opacity-50"
                  onClick={() => handleCart(item)}
               // disabled={!currentUser}
               >
                  Add to Cart
               </button>) : (
               <IncrDecreItemComponent item={existCartItem} />
            )}

            < LuEyeClosed
               onClick={() => navigate(`/products/${item.id}`)}
               className="cursor-pointer p-2 text-white bg-green-600 rounded-lg
                     hover:bg-green-700 transition"
               size={40}
            />
         </div>

      </div>
   )
}

export default ProductCard
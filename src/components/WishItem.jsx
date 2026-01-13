import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearWishes, deleteWish } from '../redux/slices/wishSlice'
import { truncate } from '../utils/truncate'
import { FaTrash } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
// import { getAverageReview } from '../utils/helper';
import { FaCartShopping } from "react-icons/fa6";
import { CartContext } from '../contexts/CartProvider';

function WishItem() {
   const { addToCart } = useContext(CartContext)
   const [wishList, setWishList] = useState([])
   const reviews = useSelector(state => state.review.reviews)
   const wishes = useSelector(state => state.wish.wishItems)
   const currentUser = useSelector(state => state.auth.currentUser)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   useEffect(() => {
      setWishList(wishes.filter(i => i.userId === currentUser))
   }, [wishes, currentUser])

   const starRenders = (rating) => {
      const rounded = Math.round(Number(rating));
      return (
         <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) =>
               i < rounded ? (
                  <FaStar key={i} className="text-yellow-500 text-sm" />
               ) : (
                  <FaRegStar key={i} className="text-yellow-500 text-sm" />
               )
            )}
            <span className="ml-1 text-xs text-gray-600">
               {Number(rating).toFixed(1)}
            </span>
         </div>
      );
   };


   const getAverageReview = (id) => {
      const review = reviews.filter((r) => r.productId == id)
      const totalRating = review.reduce((totalRating, r) => {
         return totalRating += r.rating
      }, 0)
      const avgRating = totalRating > 0 ? Number(totalRating / review.length).toFixed(2) : "4.00"
      return avgRating
   }

   function handleCart(item) {
      if (!currentUser) {
         navigate('/signin')
         return;
      }
      addToCart(item)
   }

   if (wishList.length < 1) return <p className="min-w-50 h-140 p-5 text-gray-500">Loading Cart...</p>

   console.log(wishList, "wishlist")

   return (
      <div className="w-full">
         <style>
            {`.scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { scrollbar-width: none; ms-overflow-style: none; }`}
         </style>

         <div className="max-h-[90vh] overflow-y-auto px-3 py-4 space-y-4 scrollbar-hide">

            {/* HEADER */}
            <div className="flex items-center justify-between text-sm text-gray-600">
               <span>Total Products: {wishList.length}</span>
               <button
                  onClick={() => dispatch(clearWishes(currentUser))}
                  className="text-red-600 hover:underline"
               >
                  Clear
               </button>
            </div>

            {/* ITEMS */}
            <div className="space-y-3">
               {wishList.map((item) => (
                  <div
                     key={item.productId}
                     className="flex gap-3 items-start border rounded-lg p-3 shadow-sm
                     sm:items-center"
                  >
                     {/* PRODUCT INFO */}
                     <div className="flex-1">
                        <p className="font-medium text-sm sm:text-base text-gray-800">
                           {truncate(item.product.title, 25)}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-1">
                           <span className="text-green-700 font-semibold text-sm">
                              ₹{item.product.price}
                           </span>

                           {starRenders(getAverageReview(item.product.id))}
                        </div>
                     </div>

                     {/* DELETE */}
                     <button
                        onClick={() => handleCart(item.product)}
                        className="text-red-500 hover:text-red-700 transition mt-1"
                     >
                        <FaCartShopping size={16} />
                     </button>
                     <button
                        onClick={() =>
                           dispatch(deleteWish({
                              userId: currentUser,
                              productId: item.productId
                           }))
                        }
                        className="text-red-500 hover:text-red-700 transition mt-1"
                     >
                        <FaTrash size={16} />
                     </button>
                  </div>
               ))}
            </div>

         </div>
      </div>

   )
}

export default WishItem
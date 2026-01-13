import React, { useContext, useEffect, useState } from 'react'
import { LuEyeClosed } from "react-icons/lu";
import { truncate } from "../utils/truncate";
import IncrDecreItemComponent from './IncrDecreItemComponent'
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartProvider';
import { useDispatch, useSelector } from 'react-redux';
import { getAverageReview } from '../utils/helper';
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { addToWish, deleteWish } from '../redux/slices/wishSlice';
// <GoHeartFill />
// <GoHeart />

function ProductCard({ item }) {
   // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
   // const [cartItems, setCartItems] = useState([])
   const { addToCart, cartList } = useContext(CartContext)
   const currentUser = useSelector((state) => state.auth.currentUser)
   const reviews = useSelector(state => state.review.reviews)
   const wishList = useSelector(state => state.wish.wishItems)
   const [wish, setWish] = useState(false)
   // const [wishitem, setWishItem] = useState({ id: "", wishes: {} })
   const existCartItem = cartList.find(p => item.id === p.id)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   function handleCart(item) {
      if (!currentUser) {
         navigate('/signin')
         return;
      }
      addToCart(item)
   }

   function handleAddWish(item) {
      console.log(item, "wish")
      if (!currentUser) {
         navigate('/signin')
         return;
      }
      dispatch(addToWish({
         userId: currentUser,
         productId: item.id,
         product: item
      }))
   }

   function handleRemoveWish(item) {
      console.log(item, "wishr")
      if (!currentUser) {
         navigate('/signin')
         return;
      }
      // const findItem = wishList.find(
      //    p => p.wishes === item && p.id === currentUser
      // )
      // const updateWishes = wishList.filter(
      //    item => item !== findItem
      // )
      // if (findItem) {}
      dispatch(deleteWish({
         userId: currentUser,
         productId: item.id
      }))
   }

   const starRenders = (rating) => {
      // console.log(rating, "ratin")
      const stars = [];
      for (let i = 1; i <= 5; i++) {
         stars.push(
            (i <= rating) ? (<FaStar key={i} className='text-yellow-700' />) :
               (<FaRegStar key={i} className='text-yellow-700' />)
         )
      }
      return stars;
   }

   useEffect(() => {
      const wishExist = wishList.some(
         i => i.userId === currentUser && i.productId === item.id
      )
      setWish(wishExist)
   }, [wishList, currentUser, item.id])


   return (
      // <div
      //    key={item.id}
      //    className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl hover:scale-105 
      //                transition cursor-pointer"
      // >
      <div
         className='min-width-[250px] border-2 rounded-2xl border-[#ff4d2d] flex flex-col
          bg-white shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 '>
         <div className='w-full relative h-[170px] flex justify-center items-center bg-white'>
            <div className='right-3 top-3 absolute bg-white shadow p-1 z-20 cursor-pointer'>
               {wish ? (
                  <GoHeartFill
                     size={25} className='text-green-700'
                     onClick={() => handleRemoveWish(item)}
                  />
               ) : (
                  <GoHeart
                     size={25} className='text-green-700'
                     onClick={() => handleAddWish(item)}
                  />
               )}
            </div>

            <img src={item.images?.[0]} alt={item.name}
               className='w-full h-full object-cover transition-transform
             duration-300 hover:scale-105 p-2' />
         </div>
         {/* <img
            src={item.images?.[0]}
            alt={item.name}
            className="w-40 bg-green-300 rounded-full h-40 mx-auto mb-4"
         /> */}
         <div className='flex flex-col flex-1 p-4'>
            <h1 className='font-semibold text-gray-900 text-base truncate'>
               {truncate(item.title)}
            </h1>
            <div className='flex items-center gap-1 mt-1'>
               {starRenders(getAverageReview(item.id))}
               <span className='text-sm text-gray-700'>{getAverageReview(item.id)}</span>
            </div>
         </div>

         {/* <h2 className="text-xl font-semibold text-gray-800 text-center">
            {truncate(item.title)}
         </h2> */}
         {/* <p className="text-center text-green-600 font-bold text-lg mt-2">
               ₹{item.price}
            </p> */}
         <div className="flex flex-col gap-3 mt-4">
            {/* Price */}
            <span className="font-bold text-gray-800 text-lg pl-2">
               ₹{item.price}
            </span>

            {/* Actions */}
            <div className="flex items-center gap-3 mb-2 w-full px-2">
               {!existCartItem ? (
                  <button
                     onClick={() => handleCart(item)}
                     className="flex-1 h-[42px] bg-green-600 text-white 
                        rounded-lg font-medium not-last:hover:bg-green-700 transition"
                  >
                     Add to Cart
                  </button>
               ) : (
                  <div className="flex-1 flex justify-center">
                     <IncrDecreItemComponent item={existCartItem} />
                  </div>
               )}

               {/* View Button */}
               <button
                  onClick={() => navigate(`/products/${item.id}`)}
                  className="w-[42px] h-[42px] flex items-center justify-center
                      bg-green-600 text-white rounded-lg
                      hover:bg-green-700 transition"
               >
                  <LuEyeClosed size={22} />
               </button>
            </div>
         </div>

      </div>
   )
}

export default ProductCard
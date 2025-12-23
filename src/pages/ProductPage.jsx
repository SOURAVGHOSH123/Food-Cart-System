import React, { useContext, useEffect, useState } from "react";
import { PRODUCTS } from "../constant";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartProvider";
import { useSelector } from "react-redux";
import { LuEyeClosed } from "react-icons/lu";

function ProductPage() {
   const navigate = useNavigate()
   const { addToCart } = useContext(CartContext)
   // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
   const currentUser = useSelector((state) => state.auth.currentUser)
   const [cartItems, setCartItems] = useState([])
   const [products, setProducts] = useState([])
   useEffect(() => {
      async function fetchApi() {
         // let fetchData = await fetch(`https://dummyjson.com/products/search?q=${searchData}
         // &limit=${PAGE_SIZE}&skip=${(page - 1) * PAGE_SIZE}`)

         let fetchData = await fetch(`https://dummyjson.com/products?limit=40`)
         const data = await fetchData.json()
         // console.log(data.products)
         setProducts(data.products)
      }
      fetchApi()
   }, [])

   function truncate(text, limit = 10) {
      return text.length > limit ? text.slice(0, limit) + "..." : text;
   }

   return (
      <div className="w-full min-h-screen bg-gray-50 px-10 md:px-20 py-16">

         <h1 className="text-4xl font-bold text-gray-900 mb-10">Our Products</h1>

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">

            {products.map((item) => (
               <div
                  key={item.id}
                  className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl hover:scale-105 transition cursor-pointer"
               >
                  <img
                     src={item.images[0]}
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
                     <button
                        className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                        onClick={() => addToCart(item)}
                        disabled={!currentUser}
                     >
                        Add to Cart
                     </button>

                     <LuEyeClosed
                        onClick={() => navigate(`/products/${item.id}`)}
                        className="cursor-pointer p-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
                        size={40}
                     />
                  </div>

                  {/* <button >
                     View
                  </button> */}

               </div>
            ))}

         </div>

      </div>
   );
}

export default ProductPage;

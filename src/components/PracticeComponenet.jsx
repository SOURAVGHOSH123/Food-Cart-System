import axios from 'axios'
import React, { useEffect, useState } from 'react'

function PracticeComponenet() {
   const [products, setProducts] = useState([])
   useEffect(() => {
      async function fetchApi() {
         // let fetchData = await fetch(`https://dummyjson.com/products?limit=40`)
         let fetchData = await axios.get(
            "https://dummyjson.com/products",
            {
               params: {
                  limit: 30,
                  search: "polis"
               }
            }
         );

         console.log(fetchData.data.products)
         // console.log(data.products)
         setProducts(fetchData.data.products)
      }
      fetchApi()
   }, [])
   return (
      <div>
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
                  {item.title}
               </h2>

               <p className="text-center text-green-600 font-bold text-lg mt-2">
                  {item.price}
               </p>

               <button className="w-full mt-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
               >Add to Cart
               </button>
               <button className="w-full mt-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                  View
               </button>

            </div>
         ))}
      </div>
   )
}

export default PracticeComponenet
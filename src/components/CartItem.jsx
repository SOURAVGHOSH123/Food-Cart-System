import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../contexts/CartProvider'
import { FaTrash } from "react-icons/fa6";
import IncrDecreItemComponent from './IncrDecreItemComponent';
import { truncate } from '../utils/truncate';
import { useNavigate } from 'react-router-dom';

function CartItem() {
   // const [value, setValue] = useState(1)
   const { cartList, clearItems, deleteItem } = useContext(CartContext)
   if (!cartList) return <p className="p-5 text-gray-500">Loading Cart...</p>
   // console.log(cartList, 'lists')

   // const subTotal = cartList.reduce((price, item) => (
   //    price + (item.price * item.quantity)
   // ), 0)

   // const gst = +(subTotal * 0.05).toFixed(2)        // 5% GST
   // const handlingFee = subTotal > 450 ? 0 : subTotal > 150 ? 9.99 : 12.99  // handling fee
   // const deliveryCharge = subTotal > 150 ? 0 : 30.00 // free delivery above 200
   // const total = +(subTotal + gst + handlingFee + deliveryCharge).toFixed(2)

   // function handleClear(cartList) {
   //    cartList.length = 0
   //    // window.location.href = "/products"
   // }
   const navigate = useNavigate()

   return (
      <div>
         <style>
            {`.scrollbar-hide::-webkit-scrollbar { display: none; }
             .scrollbar-hide { scrollbar-width: none; ms-overflow-style: none; }`}
         </style>
         <div className=" min-w-70 h-135 overflow-y-auto pr-2 space-y-4 p-4 scrollbar-hide">
            {cartList.length > 0 &&
               <p className="text-sm text-gray-600 mb-4">
                  Total Products: {cartList.length}
                  <button type="button" onClick={clearItems}
                     className='cursor-pointer text-red-700 float-right pr-4'>
                     clear</button>
               </p>
            }

            {/* Cart Items */}
            {cartList.length > 0 ?
               <div className="space-y-4">
                  {cartList?.map((item) => (
                     <div key={item.id} className="p-3 border rounded-lg shadow-sm">
                        {/* Product name */}
                        <p className="font-medium text-sm break-words">
                           {truncate(item.title, 25)}
                        </p>

                        {/* Price + Actions */}
                        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2 mt-2 text-gray-600 text-sm">

                           {/* PRICE (flexible) */}
                           <span className="whitespace-nowrap">
                              ₹ {(item.price * item.quantity).toFixed(2)}
                           </span>

                           {/* INCREMENT / DECREMENT (fixed width) */}
                           <div className="min-w-[90px] flex justify-center">
                              <IncrDecreItemComponent item={item} />
                           </div>

                           {/* DELETE (fixed) */}
                           <button
                              onClick={() => deleteItem(item.id, item.quantity)}
                              className="text-red-500 hover:text-red-700 flex justify-center items-center"
                           >
                              <FaTrash size={15} />
                           </button>
                        </div>
                     </div>

                  ))}

                  <button
                     className="mt-3 w-full bg-green-600 hover:bg-green-700 
               text-white py-2 rounded-md text-sm font-medium transition"
                     onClick={() => navigate("/checkout")}
                  >Checkout
                  </button>
               </div>
               :
               <div className='space-y-4 border-2 shadow-lg border-gray-200'>
                  <p className='text-lg text-gray-400 p-5 text-center'>Empty Cart</p>
               </div>
            }
         </div>

      </div>
   )
}


export default CartItem
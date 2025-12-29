import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../contexts/CartProvider'
import { FaTrash } from "react-icons/fa6";
import IncrDecreItemComponent from './IncrDecreItemComponent';
import { truncate } from '../utils/truncate';

function CartItem() {
   // const [value, setValue] = useState(1)
   const { cartList, clearItems, deleteItem } = useContext(CartContext)
   if (!cartList) return <p className="p-5 text-gray-500">Loading Cart...</p>
   console.log(cartList, 'lists')

   const subTotal = cartList.reduce((price, item) => (
      price + (item.price * item.quantity)
   ), 0)

   const gst = +(subTotal * 0.5).toFixed(2)        // 5% GST
   const handlingFee = subTotal > 150 ? 9.99 : 12.99  // handling fee
   const deliveryCharge = subTotal > 150 ? 0 : 30.00 // free delivery above 200
   const total = +(subTotal + gst + handlingFee + deliveryCharge).toFixed(2)

   // function handleClear(cartList) {
   //    cartList.length = 0
   //    // window.location.href = "/products"
   // }

   return (
      <div>
         <style>
            {`.scrollbar-hide::-webkit-scrollbar { display: none; }
             .scrollbar-hide { scrollbar-width: none; ms-overflow-style: none; }`}
         </style>
         <div className="max-h-150 overflow-y-auto pr-2 space-y-4 p-4 scrollbar-hide">
            <h2 className="text-xl mt-3 font-semibold mb-3">Your Cart</h2>
            {cartList.length > 0 &&
               <p className="text-sm text-gray-600 mb-4">
                  Total Products: {cartList.length}
                  <button type="button" onClick={clearItems}
                     className='cursor-pointer text-red-700 float-right pr-4'>
                     clear</button>
               </p>
            }
            {/* Cart Items */}
            <div className="space-y-4">
               {cartList?.map((item) => (
                  <div key={item.id} className="p-3 border rounded-lg shadow-sm">
                     <p className="font-medium">{truncate(item.title, 25)}</p>

                     <div className="flex items-center gap-3 text-gray-500 text-sm">
                        <span className='min-w-[25px]'>${(item.price * item.quantity).toFixed(2)}</span>
                        <IncrDecreItemComponent item={item} />

                        {/* <p className="text-gray-500 text-sm"></p> */}

                        <button
                           onClick={() => deleteItem(item.id, item.quantity)
                              // setCartList((prev) =>
                              //    prev.filter((p) => p.id !== item.id)
                              // )
                           }
                           className="text-red-500 cursor-pointer text-sm mt-1 mr-2"
                        >
                           <FaTrash size={16} />
                        </button>
                     </div>
                  </div>
               ))}
            </div>

            {/* Price Summary */}
            {/* {subTotal > 0 && */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
               <h3 className="text-lg font-semibold mb-3">Price Details</h3>

               <div className="flex justify-between py-1 text-sm">
                  <span>Subtotal</span>
                  <span>₹ {subTotal.toFixed(2)}</span>
               </div>

               <div className="flex justify-between py-1 text-sm">
                  <span>GST (18%)</span>
                  <span>₹ {gst}</span>
               </div>

               <div className="flex justify-between py-1 text-sm">
                  <span>Handling Fee</span>
                  <span>₹ {handlingFee}</span>
               </div>

               <div className="flex justify-between py-1 text-sm">
                  <span>Delivery Charge</span>
                  <span className="text-green-600">
                     {deliveryCharge === 0 ? "Free" : `₹ ${deliveryCharge}`}
                  </span>
               </div>

               <hr className="my-3" />

               <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹ {total}</span>
               </div>

               <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition">
                  Proceed to Checkout
               </button>
            </div>
            {/*  } */}
         </div>

      </div>
   )
}

export default CartItem
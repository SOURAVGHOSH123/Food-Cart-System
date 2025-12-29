import React, { useContext } from 'react'
import { TiPlus } from "react-icons/ti"
import { LuMinus } from "react-icons/lu"
import { CartContext } from '../contexts/CartProvider'

function IncrDecreItemComponent({ item }) {
   console.log(item, "itemm")
   const { increaseQuantity, decreaseQuantity } = useContext(CartContext)

   return (
      <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-lg shadow-sm">
         <button
            onClick={() => decreaseQuantity(item.id)}
            className="w-5 h-5 flex items-center justify-center 
            rounded-full bg-red-100 text-red-600 
            hover:bg-red-200 transition"
         >
            <LuMinus size={16} />
         </button>

         <span className="text-gray-900 font-semibold min-w-[10px] text-center">
            {item.quantity}
         </span>

         <button
            onClick={() => increaseQuantity(item.id)}
            className="w-5 h-5 flex items-center justify-center 
            rounded-full bg-green-100 text-green-600 
            hover:bg-green-200 transition"
         >
            <TiPlus size={16} />
         </button>
      </div>
   )
}

export default IncrDecreItemComponent

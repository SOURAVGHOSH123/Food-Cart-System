import React, { useContext } from 'react'
import { TiPlus } from "react-icons/ti"
import { LuMinus } from "react-icons/lu"
import { CartContext } from '../contexts/CartProvider'

function IncrDecreItemComponent({ item }) {
   const { increaseQuantity, decreaseQuantity } = useContext(CartContext)

   return (
      <div className="flex items-center gap-2
         bg-gray-100 px-2 py-2 rounded-lg shadow-sm">
         <button
            onClick={() => decreaseQuantity(item.id)}
            className="w-6 h-6 flex items-center justify-center
               rounded bg-red-100 text-red-600 hover:bg-red-200"
         >
            <LuMinus size={15} />
         </button>

         <span className="text-gray-900 font-semibold text-lg px-4 text-center">
            {item.quantity}
         </span>

         <button
            onClick={() => increaseQuantity(item.id)}
            className="w-6 h-6 flex items-center justify-center
               rounded bg-green-100 text-green-600 hover:bg-green-200"
         >
            <TiPlus size={15} />
         </button>
      </div>
   )
}

export default IncrDecreItemComponent
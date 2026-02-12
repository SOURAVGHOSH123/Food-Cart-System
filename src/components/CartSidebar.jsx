import React, { useState } from "react";
import CartItem from "./CartItem";

function CartSidebar({ open, setOpen }) {
   return (
      <div
         className={`fixed top-0 right-0 h-auto w-auto bg-white shadow-2xl  mt-12 
            border-l transform transition-transform duration-300 z-50 items-center
         ${open ? "translate-x-0" : "translate-x-full"}`}
      >
         <h2 className="text-xl my-3 font-semibold px-3">Your Cart</h2>

         {/* Close Button */}
         <button
            onClick={() => setOpen(false)}
            className="absolute p-auto cursor-pointer top-3 right-3 text-xl text-red-600"
         >
            ✕
         </button>
         <CartItem />

      </div>
   );
}

export default CartSidebar;

import React, { useState } from "react";
import CartItem from "./CartItem";

function CartSidebar({ open, setOpen }) {
   return (
      <div
         className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl 
            border-l transform transition-transform duration-300 z-50 
         ${open ? "translate-x-0" : "translate-x-full"}`}
      >
         {/* Close Button */}
         <button
            onClick={() => setOpen(false)}
            className="absolute p-3 top-3 right-3 text-xl text-red-600"
         >
            ✕
         </button>
         <CartItem />

      </div>
   );
}

export default CartSidebar;

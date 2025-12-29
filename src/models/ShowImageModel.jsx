import React from 'react'
import { IoClose } from "react-icons/io5";

function ShowImageModel({ isOpen, onClose, image }) {
   if (!isOpen) return null;
   return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      >

         {/* Modal Box */}
         <div className="bg-white w-full max-w-lg rounded-xl mt-10 p-6 shadow-xl relative">

            {/* Close */}
            <button
               onClick={onClose}
               className="absolute right-4 top-4 text-xl text-gray-500 hover:text-black"
            >
               <IoClose />
            </button>

            <img src={image} alt="image is here" />
         </div>
      </div>
   )
}

export default ShowImageModel
import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function Pagination({ total, currentPage, onChange }) {
   if (total <= 1) return null;

   return (
      <div className="w-full flex justify-center my-6">
         <div className="flex relative items-center gap-2 max-w-full px-5">

            {/* Prev */}
            <button
               onClick={() => onChange(currentPage - 1)}
               disabled={currentPage === 1}
               className="absolute left-0 p-1 h-full rounded disabled:opacity-40"
            >
               <IoIosArrowBack size={16} />
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide 
               max-w-[70vw] sm:max-w-[50vw]">
               {Array.from({ length: total }, (_, i) => (
                  <button
                     key={i}
                     onClick={() => onChange(i + 1)}
                     className={`min-w-9 h-9 flex items-center
                         justify-center border rounded text-sm
                        ${currentPage === i + 1
                           ? "bg-green-600 text-white"
                           : "bg-white text-gray-700"
                        }`} >
                     {i + 1}
                  </button>
               ))}
            </div>

            {/* Next */}
            <button
               onClick={() => onChange(currentPage + 1)}
               disabled={currentPage === total}
               className="absolute h-full p-1 right-0 rounded disabled:opacity-40"
            >
               <IoIosArrowForward size={16} />
            </button>

         </div>
      </div>
   );
}

export default Pagination;

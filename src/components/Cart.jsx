// import React from "react";
// import { X } from "lucide-react"; // cross icon

// function Cart({ item, onRemove }) {
//    return (
//       <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-xl border border-gray-200 w-full max-w-xl mx-auto">

//          {/* Product Image */}
//          <img
//             src={item.images[0]}
//             alt={item.title}
//             className="w-24 h-24 object-cover rounded-xl"
//          />

//          {/* Product Info */}
//          <div className="flex-1">
//             <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>

//             <p className="text-sm text-gray-500">{item.brand}</p>

//             <p className="mt-1 text-green-600 font-bold text-lg">
//                ${item.price}
//             </p>

//             <p className="text-sm text-gray-500">
//                {item.availabilityStatus}
//             </p>
//          </div>

//          {/* Remove Button */}
//          <button
//             onClick={() => onRemove(item.id)}
//             className="p-2 hover:bg-red-100 rounded-full transition"
//          >
//             <X className="text-red-500" size={20} />
//          </button>
//       </div>
//    );
// }

// export default Cart;

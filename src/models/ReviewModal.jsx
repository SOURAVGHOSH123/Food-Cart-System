import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

function ReviewModal({ isOpen, onClose, product, onSubmit }) {
   const [rating, setRating] = useState(0);
   // const [like, setLike] = useState(false);
   const [comment, setComment] = useState("");
   // const cuser = JSON.parse(localStorage.getItem("currentUser"))
   const cuser = useSelector(state => state.auth.currentUser)
   // const users = JSON.parse(localStorage.getItem("data"))
   const users = useSelector(state => state.auth.users)
   let user = users.find((r) => r.email === cuser)
   if (!isOpen) return null;

   const handleSubmit = () => {
      if (!rating || !comment.trim()) return alert("Please add rating & comment");

      onSubmit({
         id: uuid(),
         productId: product.id,
         userId: user.id,
         name: user.name,
         rating,
         like: false,
         reactions: {},
         comment,
         date: Date.now(),
      });

      setRating(0);
      setComment("");
      onClose();
   };

   return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">

         {/* Modal Box */}
         <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl relative">

            {/* Close */}
            <button
               onClick={onClose}
               className="absolute right-4 top-4 text-xl text-gray-500 hover:text-black"
            >
               <IoClose />
            </button>

            <h2 className="text-2xl font-semibold mb-2">Rate Product</h2>
            <p className="text-gray-600 mb-4">{product.title}</p>

            {/* Rating */}
            <div className="flex gap-2 mb-4">
               {[1, 2, 3, 4, 5].map((star) => (
                  <button
                     key={star}
                     onClick={() => setRating(star)}
                     className={`text-3xl transition 
                        ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                  >
                     ★
                  </button>
               ))}
            </div>

            {/* Comment */}
            <textarea
               rows="4"
               value={comment}
               onChange={(e) => setComment(e.target.value)}
               placeholder="Write your review..."
               className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
            />

            {/* Actions */}
            <div className="flex gap-4 mt-6">
               <button
                  onClick={handleSubmit}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
               >
                  Submit
               </button>

               <button
                  onClick={onClose}
                  className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300 transition"
               >
                  Cancel
               </button>
            </div>

         </div>
      </div>
   );
}

export default ReviewModal;

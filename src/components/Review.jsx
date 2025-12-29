import React, { useEffect, useMemo, useState } from 'react'
import { BiLike } from "react-icons/bi";
// import { AiFillLike } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { updateReview } from '../redux/slices/reviewSlice';
import { BiSolidLike } from "react-icons/bi";
import { getRelativeTime } from '../utils/getRelativeTime';
import { BiDislike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { getLikeCount, getDislikeCount } from '../utils/helper';
import { useParams } from 'react-router-dom';
import { truncate } from '../utils/truncate';
import { MdMessage } from "react-icons/md";

function Review({ review }) {
   const { id } = useParams()
   const users = useSelector(state => state.auth.users)
   const cuser = useSelector(state => state.auth.currentUser)
   let user = users.find((r) => r.email === cuser)
   // const reviews = useSelector(state => state.review.reviews)
   const dispatch = useDispatch()

   return (
      <>
         <style>
            {`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { scrollbar-width: none; ms-overflow-style: none; }`}
         </style>
         {review.length > 0 &&
            <div className="max-h-screen max-w-sm mx-auto">
               <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Customer Reviews
               </h2>

               <div className="overflow-y-auto space-y-6 max-h-176 scrollbar-hide">
                  {review.map((r, index) => {
                     const reactions = r.reactions || {};
                     const myReaction = reactions[user.id]
                     const likes = getLikeCount(reactions);
                     const dislikes = getDislikeCount(reactions);
                     return (
                        <div
                           key={r.id}
                           className="flex gap-4 p-5 bg-white rounded-xl shadow hover:shadow-md transition"
                        >
                           {/* Avatar */}
                           < div className="flex-shrink-0" >
                              <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center 
                                 justify-center font-bold text-lg">
                                 {r.name?.charAt(0)?.toUpperCase() || "U"}
                              </div>
                           </div>

                           {/* Content */}
                           <div className="flex-1">
                              {/* Header */}
                              <div className="flex items-center gap-3">
                                 <p className="font-semibold text-gray-900">
                                    {r.name || "Anonymous User"}
                                 </p>
                                 <span className="text-sm text-gray-500">
                                    • {getRelativeTime(r.date) || "Just now"}
                                 </span>
                              </div>

                              {/* Rating */}
                              <div className="flex items-center gap-1 mt-1 text-gray-700">
                                 {"★".repeat(r.rating)}
                                 {"☆".repeat(5 - r.rating)}
                              </div>

                              {/* Comment */}
                              <p className="mt-2 text-gray-700 leading-relaxed text-wrap">
                                 {truncate(r.comment, 100)}
                              </p>

                              {/* Actions */}
                              <div className="flex items-center gap-6 mt-3 text-sm text-gray-500">
                                 <button className="hover:text-green-600 transition"
                                    onClick={() => dispatch(updateReview({ reviewid: r.id, userId: user.id, reaction: "like" }))}>
                                    {myReaction === "like" ?
                                       <BiSolidLike size={20} className='text-blue-600' /> :
                                       <BiLike size={20} className='text-blue-600' />}
                                    {likes}{myReaction === "like" && " you"}
                                 </button>
                                 <button className="hover:text-green-600 transition"
                                    onClick={() => dispatch(updateReview({ reviewid: r.id, userId: user.id, reaction: "dislike" }))}>
                                    {myReaction === "dislike" ?
                                       <BiSolidDislike size={20} className='text-blue-600' /> :
                                       <BiDislike size={20} className='text-blue-600' />}
                                    {dislikes}{myReaction === "dislike" && " you"}
                                 </button>
                                 <button className="hover:text-green-600 transition">
                                    <MdMessage size={20} />reply
                                 </button>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div >
            </div >
         }
      </>

   )
}

export default Review
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../contexts/CartProvider'
import ReviewModal from '../models/ReviewModal'
import Review from './Review'
import { useDispatch, useSelector } from 'react-redux'
import { setReviews } from '../redux/slices/reviewSlice'
import axios from 'axios'
import { getAverageReview } from '../utils/helper'
import IncrDecreItemComponent from './IncrDecreItemComponent'
import ShowImageModel from '../models/ShowImageModel'

function SingleProduct() {
   const { id } = useParams()
   const { addToCart, cartList } = useContext(CartContext)
   const [product, setProduct] = useState({})
   const [activeImage, setActiveImage] = useState("")
   const [open, setOpen] = useState(false)
   const [openImage, setOpenImage] = useState(false)
   // const [value, setValue] = useState(1)
   // const [review, setReview] = useState([])
   const dispatch = useDispatch()

   const reviews = useSelector(state => state.review.reviews)
   // const [reviews, setReviews] = useState([])


   useEffect(() => {
      async function fetchProduct() {
         let fetchData = await axios.get(`https://dummyjson.com/products/${id}`)
         // let data = await fetchData.json();
         // console.log(fetchData.data, "data")
         setProduct(fetchData.data)
      }
      fetchProduct()
      console.log(product, "productt")
   }, [id]);
   // console.log(id, "id");

   // useEffect(() => {
   //    const review = JSON.parse(localStorage.getItem("reviews")) || [];
   //    setReviews(review)
   // }, [])
   // console.log(reviews, "reviews")

   const review = useSelector(state =>
      state.review.reviews.filter(
         r => String(r.productId) === String(id)
      )
   );

   useEffect(() => {
      if (product.images?.length) {
         setActiveImage(product.images[0])
      }
   }, [product])

   // useEffect(() => {
   //    const filtered = reviews.filter(
   //       (item) => String(item.productId) === String(id)
   //    );
   //    console.log(filtered, "filtered")
   //    setReview(filtered);
   // }, [reviews, id]);

   function handleSubmit(data) {
      // console.log(data, "data");
      // setReview(data)
      let temp = [...reviews, data]
      // localStorage.setItem("reviews", JSON.stringify(temp));
      dispatch(setReviews(temp))
      // setReviews(temp)
      setOpen(false)
      // setInterval(()=> null)
   }

   const existCartItem = cartList.find(item => item.id === product.id)

   return (
      <div className="w-full min-h-screen bg-gray-100 flex justify-center py-16 px-6">
         {product &&
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-4xl w-full grid 
               grid-cols-1 md:grid-cols-2 gap-10">
               {/* Product Image */}
               <div className="flex flex-col items-center gap-4">
                  {product.images &&
                     <img
                        onClick={() => setOpenImage(true)}
                        src={activeImage}
                        alt={product.title}
                        className="w-full rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition cursor-pointer"
                     />
                  }

                  {product.images?.length > 1 && (
                     <div className="flex gap-3 mt-4">
                        {product.images.map((img, index) => (
                           <div key={index}
                              onClick={() => setActiveImage(img)}
                              className={`w-16 h-16 border rounded-lg cursor-pointer overflow-hidden
                              ${activeImage === img ? "border-blue-600" : "border-gray-300"}`}
                           >
                              <img src={img}
                                 alt="thumbnail"
                                 className="w-full h-full object-cover"
                              />
                           </div>
                        ))}
                     </div>
                  )}

                  <span className={`px-4 py-1 rounded-full text-white text-sm 
                  ${product.availabilityStatus === "In Stock" ? "bg-green-600" : "bg-red-600"}
               `}>
                     {product.availabilityStatus}
                  </span>
               </div>

               {/* Product Details */}
               <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                     {product.title}
                  </h1>

                  <p className="text-gray-700 mb-4">{product.description}</p>

                  {/* Price */}
                  <div className="flex items-center gap-4 mb-4">
                     <p className="text-3xl font-bold text-green-600">₹{product.price}</p>
                     <s className="text-3xl font-bold text-green-600">₹{(product.price + (product.price / 100) * product.discountPercentage).toFixed(2)}</s>
                     <p className="text-red-600 font-semibold">{product.discountPercentage}% OFF</p>
                  </div>

                  {/* Rating */}
                  <p className="text-yellow-600 font-medium mb-4">
                     ⭐ Rating: {getAverageReview(reviews, id)}
                  </p>

                  {/* Brand & Category */}
                  <p className="text-gray-700 mb-1">
                     <span className="font-semibold">Brand:</span> {product.brand}
                  </p>

                  <p className="text-gray-700 mb-4">
                     <span className="font-semibold">Category:</span> {product.category}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                     {product.tags?.map((tag) => (
                        <span
                           key={tag}
                           className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                        >
                           #{tag}
                        </span>
                     ))}
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 gap-3 text-gray-700 text-sm mb-6">
                     <p><b>Stock:</b> {product.stock}</p>
                     <p><b>Minimum Order Qty:</b> {product.minimumOrderQuantity}</p>
                     <p><b>SKU:</b> {product.sku}</p>
                     {/* <p><b>Weight:</b> {product.weight} g</p> */}
                     {/* <p><b>Dimensions:</b> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</p> */}
                     <p><b>Warranty:</b> {product.warrantyInformation}</p>
                     <p><b>Return Policy:</b> {product.returnPolicy}</p>
                     <p><b>Shipping:</b> {product.shippingInformation}</p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4">
                     {/* Add / Quantity Button */}
                     {!existCartItem ? (
                        <button
                           className="w-full min-h-[52px] flex items-center justify-center
                            bg-blue-600 text-white rounded-lg transition font-medium
                            hover:bg-blue-700"
                           onClick={() => addToCart(product)}>
                           add to cart </button>
                     ) : (
                        <IncrDecreItemComponent item={existCartItem} />
                     )}

                     {/* Buy Now */}
                     <button
                        className="w-full min-h-[52px] 
                          bg-orange-500 text-white rounded-lg 
                          hover:bg-orange-600 transition font-medium"
                     >
                        Buy Now
                     </button>

                     {/* Rate Product */}
                     <button
                        className="w-full min-h-[52px] 
                         bg-yellow-500 text-white rounded-lg 
                         hover:bg-yellow-600 transition font-medium"
                        onClick={() => setOpen(true)}
                     >
                        Rate Product
                     </button>
                  </div>

               </div>
            </div>
         }

         {/* reviews model */}
         <ReviewModal
            isOpen={open}
            onClose={() => setOpen(false)}
            product={product}
            onSubmit={handleSubmit}
         />
         <ShowImageModel
            isOpen={openImage}
            onClose={() => setOpenImage(false)}
            image={activeImage}
         />
         <Review review={review} />

      </div >
   );
}

export default SingleProduct
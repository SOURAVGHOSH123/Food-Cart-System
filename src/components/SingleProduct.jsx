import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../contexts/CartProvider'
import ReviewModal from '../models/ReviewModal'
import Review from './Review'
import { useDispatch, useSelector } from 'react-redux'
import { setReviews } from '../redux/slices/reviewSlice'
import axios from 'axios'

import IncrDecreItemComponent from './IncrDecreItemComponent'
import ShowImageModel from '../models/ShowImageModel'
import { ThreeDots } from 'react-loader-spinner'

function SingleProduct() {
   const { id } = useParams()
   const { addToCart, cartList } = useContext(CartContext)
   const [product, setProduct] = useState({})
   const [activeImage, setActiveImage] = useState("")
   const [open, setOpen] = useState(false)
   const [openImage, setOpenImage] = useState(false)
   const [loading, setLoading] = useState(false)
   // const [value, setValue] = useState(1)
   // const [review, setReview] = useState([])
   const dispatch = useDispatch()

   const reviews = useSelector(state => state.review.reviews)
   console.log(reviews, "rs")
   // const [reviews, setReviews] = useState([])

   useEffect(() => {
      setLoading(true)
      try {
         async function fetchProduct() {
            let fetchData = await axios.get(`https://dummyjson.com/products/${id}`)
            // let data = await fetchData.json();
            console.log(fetchData.data, "data")
            setProduct(fetchData.data)
            setLoading(false)
         }
         fetchProduct()
         // console.log(product, "productt")
      } catch (error) {
         console.log(error, "singleproduct error")
         setLoading(false)
      }
   }, [id]);
   // console.log(id, "id");

   // useEffect(() => {
   //    const review = JSON.parse(localStorage.getItem("reviews")) || [];
   //    setReviews(review)
   // }, [])
   // console.log(reviews, "reviews")

   const review = reviews.filter(
      (r) => String(r.productId) === String(id)
   );
   console.log(review, "rvw")

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
      // e.preventDefault();
      try {
         console.log(data, "data");
         // setReview(data)
         let temp = [...reviews, data]
         // localStorage.setItem("reviews", JSON.stringify(temp));
         dispatch(setReviews(temp))
         // setReviews(temp)
         setOpen(false)
         // setInterval(()=> null)
      } catch (error) {
         console.log(error, "review submit error")
      }
   }

   const existCartItem = cartList.find(item => item.id === product.id)

   const getAverageReview = () => {
      if (!review || review.length === 0) return "4.00";

      const totalRating = review.reduce((sum, r) => sum + r.rating, 0);
      return (totalRating / review.length).toFixed(2);
   };

   return (
      <div className="w-full min-h-screen bg-gray-100 px-3 md:px-6 py-6">
         {loading ? (
            <div className="flex justify-center items-center min-h-[60vh]">
               <ThreeDots height="80" width="80" color="#4fa94d" />
            </div>
         ) : (
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

               {/* PRODUCT DETAILS SECTION */}
               <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-4 md:p-8">
                  {/* IMAGE + DETAILS GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                     {/* LEFT – IMAGES */}
                     <div className="flex flex-col items-center gap-4">
                        {product?.images && (
                           <img
                              onClick={() => setOpenImage(true)}
                              src={activeImage}
                              alt={product.title}
                              className="w-full max-h-[400px] object-contain rounded-xl cursor-pointer"
                           />
                        )}

                        <div className="flex gap-2 flex-wrap justify-center">
                           {product.images?.map((img, i) => (
                              <img
                                 key={i}
                                 src={img}
                                 onClick={() => setActiveImage(img)}
                                 className={`w-16 h-16 object-cover rounded-lg cursor-pointer border
                                 ${activeImage === img ? "border-blue-600" : "border-gray-300"}`}
                              />
                           ))}
                        </div>
                     </div>

                     {/* RIGHT – PRODUCT INFO */}
                     <div>
                        <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
                        <p className="text-gray-600 mt-2">{product.description}</p>

                        <div className="flex flex-wrap items-center gap-3 mt-4">
                           <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                           <s className="text-gray-500">
                              ₹{(product.price + product.price * product.discountPercentage / 100).toFixed(2)}
                           </s>
                           <span className="text-red-600 font-semibold">
                              {product.discountPercentage}% OFF
                           </span>
                        </div>

                        <p className="mt-2 text-yellow-600">
                           ⭐ Rating: {getAverageReview()}
                        </p>

                        {/* Brand & Category */}
                        <p className="mt-2 text-yellow-600">
                           <span className="font-semibold">Brand:</span>
                           {product.brand} </p>
                        <p className="mt-2 text-yellow-600">
                           <span className="font-semibold">Category:</span>
                           {product.category} </p>

                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-3 mt-4">
                           {product.tags?.map((tag) => (
                              <span key={tag}
                                 className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm" >
                                 #{tag} </span>
                           ))}
                        </div>

                        {/* Additional Info */}
                        <div className="grid grid-cols-1 gap-3 text-gray-700 text-sm mt-4">
                           <p><b>Stock:</b> {product.stock}</p>
                           <p><b>Minimum Order Qty:</b> {product.minimumOrderQuantity}</p>
                           <p><b>SKU:</b> {product.sku}</p>

                           {/* <p><b>Weight:</b> {product.weight} g</p> */}
                           {/* <p><b>Dimensions:</b> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</p> */}
                           <p><b>Warranty:</b> {product.warrantyInformation}</p>
                           <p><b>Return Policy:</b> {product.returnPolicy}</p>
                           <p><b>Shipping:</b> {product.shippingInformation}</p>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                           {!existCartItem ? (
                              <button
                                 onClick={() => addToCart(product)}
                                 className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                              >
                                 Add to Cart
                              </button>
                           ) : (
                              <IncrDecreItemComponent item={existCartItem} />
                           )}

                           <button className="bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600">
                              Buy Now
                           </button>

                           <button
                              onClick={() => setOpen(true)}
                              className="bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600"
                           >
                              Rate Product
                           </button>
                        </div>
                     </div>
                  </div>
               </div>

               {/* REVIEWS SECTION */}
               {/* <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 h-fit max-h-[80vh] overflow-y-auto"> */}
               <Review review={review} />
               {/* </div> */}

            </div>
         )}

         {/* MODALS */}
         <ReviewModal isOpen={open} onClose={() => setOpen(false)} product={product} onSubmit={handleSubmit} />
         <ShowImageModel isOpen={openImage} onClose={() => setOpenImage(false)} image={activeImage} />
      </div>

   );
}

export default SingleProduct

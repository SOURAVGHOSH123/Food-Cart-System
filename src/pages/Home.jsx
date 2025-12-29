import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
   const navigate = useNavigate()
   return (
      <div className="w-full min-h-screen bg-gray-50">

         {/* Hero Section */}
         <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-10">

            {/* Left Text */}
            <div className="max-w-xl">
               <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                  Fresh Food Delivered <span className="text-green-600">Fast</span> & Hot!
               </h1>

               <p className="mt-5 text-gray-600 text-lg">
                  Order your favorite meals from the best restaurants near you.
                  Fast delivery, best quality, and great taste every time!
               </p>

               <button className="mt-8 px-8 py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition"
                  onClick={() => navigate('/products')}>
                  Order Now
               </button>
            </div>

            {/* Right Image */}
            <div className="mt-10 md:mt-0">
               <img
                  src="https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
                  alt="Food Delivery"
                  className="w-[450px]"
               />
            </div>
         </section>

         {/* Popular Categories */}
         <section className="px-10 md:px-20 py-16">
            <h2 className="text-3xl font-semibold mb-8 text-gray-900">Popular Categories</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

               <div className="p-6 bg-white shadow rounded-xl flex flex-col items-center hover:scale-105 transition">
                  <img src="https://images.pexels.com/photos/1199956/pexels-photo-1199956.jpeg"
                     alt="Burger" className="max-w-30 max-h-30 mb-4" />
                  <p className="text-lg font-medium">Burgers</p>
               </div>

               <div className="p-6 bg-white shadow rounded-xl flex flex-col items-center hover:scale-105 transition">
                  <img src="https://images.pexels.com/photos/4394612/pexels-photo-4394612.jpeg"
                     alt="Pizza" className="max-w-30 max-h-30 mb-4" />
                  <p className="text-lg font-medium">Pizza</p>
               </div>

               <div className="p-6 bg-white shadow rounded-xl flex flex-col items-center hover:scale-105 transition">
                  <img src="https://images.pexels.com/photos/1052189/pexels-photo-1052189.jpeg"
                     alt="Sushi" className="max-w-30 max-h-30 mb-4" />
                  <p className="text-lg font-medium">Sushi</p>
               </div>

               <div className="p-6 bg-white shadow rounded-xl flex flex-col items-center hover:scale-105 transition">
                  <img src="https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg"
                     alt="Dessert" className="max-w-30 max-h-30 mb-4" />
                  <p className="text-lg font-medium">Desserts</p>
               </div>

            </div>
         </section>

         {/* Features Section */}
         <section className="px-10 md:px-20 py-20 bg-green-600 text-white">
            <h2 className="text-3xl font-semibold mb-10">Why Choose Us?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

               <div className="p-6 bg-white text-green-700 rounded-xl shadow">
                  <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
                  <p>We ensure your order reaches you within minutes, fresh & hot!</p>
               </div>

               <div className="p-6 bg-white text-green-700 rounded-xl shadow">
                  <h3 className="text-xl font-bold mb-2">Quality Food</h3>
                  <p>Only the finest restaurants and verified chefs partner with us.</p>
               </div>

               <div className="p-6 bg-white text-green-700 rounded-xl shadow">
                  <h3 className="text-xl font-bold mb-2">Easy Payments</h3>
                  <p>Pay with UPI, cards, or cash — hassle-free and secure!</p>
               </div>

            </div>
         </section>

      </div>
   );
}

export default Home;

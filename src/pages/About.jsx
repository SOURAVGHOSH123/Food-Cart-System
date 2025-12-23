import React from "react";
import { useLocation } from "react-router-dom";
import { IoIosPersonAdd } from "react-icons/io";

function About() {
   const location = useLocation();
   console.log(location?.state);   // optional chaining, don't use when variable is declare with 'const'
   return (
      <div className="w-full min-h-screen bg-gray-50 text-gray-800">

         {/* Header Section */}

         <div className="px-10 md:px-20 py-20 bg-green-600 text-white">
            <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>

            <p className="mt-4 text-lg max-w-2xl">
               We deliver fresh, tasty, and hygienic food from top restaurants straight to your doorstep.
            </p>
         </div>

         {location?.state &&
            <div className="px-10 md:px-20 py-5 bg-orange-400 text-white">
               <h1 className="text-4xl md:text-5xl font-bold">About Owner</h1>

               <p className="mt-4 text-lg max-w-2xl">
                  Our owner name is {location?.state?.name}
               </p>
            </div>
         }

         {/* Mission Section */}
         <section className="px-10 md:px-20 py-16">
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
               Our mission is simple — make food ordering easy, fast, and enjoyable.
               We partner with the best chefs and restaurants to bring you high-quality meals at your convenience.
               With fast delivery, great customer support, and a smooth user experience, we aim to become your go-to food delivery service.
            </p>
         </section>

         {/* Our Values */}
         <section className="px-10 md:px-20 py-16 bg-white">
            <h2 className="text-3xl font-semibold mb-10">Our Values</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

               <div className="p-6 shadow rounded-xl bg-gray-50">
                  <h3 className="text-xl font-bold text-green-600 mb-2">Quality Food</h3>
                  <p className="text-gray-700">
                     We maintain strict hygiene and partner only with trusted restaurants.
                  </p>
               </div>

               <div className="p-6 shadow rounded-xl bg-gray-50">
                  <h3 className="text-xl font-bold text-green-600 mb-2">Fast Delivery</h3>
                  <p className="text-gray-700">
                     Our delivery partners ensure your food arrives hot and on time.
                  </p>
               </div>

               <div className="p-6 shadow rounded-xl bg-gray-50">
                  <h3 className="text-xl font-bold text-green-600 mb-2">Customer First</h3>
                  <p className="text-gray-700">
                     Every decision we make begins with your comfort and satisfaction.
                  </p>
               </div>

            </div>
         </section>

         {/* Team Section */}
         <section className="px-10 md:px-20 py-16 bg-gray-100">
            <h2 className="text-3xl font-semibold mb-10">Meet the Team</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

               <div className="p-6 shadow bg-white rounded-xl text-center">
                  <img
                     src={<IoIosPersonAdd size={40} />}
                     alt="Team"
                     className="w-32 h-32 mx-auto rounded-full mb-4"
                  />
                  <h3 className="text-xl font-bold">Sourav Ghosh</h3>
                  <p className="text-gray-600">Founder</p>
               </div>

               <div className="p-6 shadow bg-white rounded-xl text-center">
                  <IoIosPersonAdd size={40} className="w-32 h-32 mx-auto rounded-full mb-4" />

                  <h3 className="text-xl font-bold">Rahul Sharma</h3>
                  <p className="text-gray-600">App Developer</p>
               </div>

               <div className="p-6 shadow bg-white rounded-xl text-center">
                  <img
                     src={<IoIosPersonAdd size={40} />}
                     alt="Team"
                     className="w-32 h-32 mx-auto rounded-full mb-4"
                  />
                  <h3 className="text-xl font-bold">Priya Singh</h3>
                  <p className="text-gray-600">UI/UX Designer</p>
               </div>

            </div>
         </section>

         {/* Footer */}
         <div className="text-center py-6 text-gray-600 bg-white">
            © 2025 FoodDelivery — All Rights Reserved.
         </div>
      </div>
   );
}

export default About;

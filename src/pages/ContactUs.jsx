import React from "react";

function ContactUs() {
   return (
      <div className="w-full min-h-screen bg-gray-50 px-10 md:px-20 py-16">

         <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
         <p className="text-lg text-gray-600 max-w-2xl mb-10">
            Have questions, feedback, or need help? We are here for you!
            Reach out to us and our team will respond as soon as possible.
         </p>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Contact Form */}
            <form className="bg-white shadow-lg rounded-xl p-8 flex flex-col gap-6">
               <input
                  type="text"
                  placeholder="Full Name"
                  className="border p-3 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
               />

               <input
                  type="email"
                  placeholder="Email Address"
                  className="border p-3 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
               />

               <input
                  type="text"
                  placeholder="Subject"
                  className="border p-3 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
               />

               <textarea
                  rows="5"
                  placeholder="Your Message"
                  className="border p-3 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
               ></textarea>

               <button className="py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
                  Send Message
               </button>
            </form>

            {/* Contact Info */}
            <div className="flex flex-col gap-6">

               <div className="p-6 bg-white shadow rounded-xl">
                  <h2 className="text-xl font-semibold text-green-600 mb-2">📍 Address</h2>
                  <p className="text-gray-700">123 Food Street, Kolkata, India</p>
               </div>

               <div className="p-6 bg-white shadow rounded-xl">
                  <h2 className="text-xl font-semibold text-green-600 mb-2">📞 Phone</h2>
                  <p className="text-gray-700">+91 98765 43210</p>
               </div>

               <div className="p-6 bg-white shadow rounded-xl">
                  <h2 className="text-xl font-semibold text-green-600 mb-2">📧 Email</h2>
                  <p className="text-gray-700">support@fooddelivery.com</p>
               </div>

            </div>
         </div>

      </div>
   );
}

export default ContactUs;

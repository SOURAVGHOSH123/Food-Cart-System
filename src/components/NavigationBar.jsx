import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaCartShopping } from "react-icons/fa6";
import CartSidebar from './CartSidebar';
import WishSidebar from './wishSidebar';
import { CgProfile } from "react-icons/cg";
import { SiWish } from "react-icons/si";

function NavigationBar() {
   const navigate = useNavigate()
   const [cartOpen, setCartOpen] = useState(false)
   const [wishOpen, setWishOpen] = useState(false)

   return (
      <nav className="w-full sticky top-0 z-50 bg-amber-300 shadow-md py-3 px-4 md:px-6">

         {/* MAIN FLEX WRAPPER */}
         <div className="flex justify-between items-center">

            {/* LEFT MENU */}
            <ul className="flex gap-3 md:gap-8 text-xs md:text-lg text-green-700 font-medium">
               <li className="cursor-pointer hover:text-green-900 transition"
                  onClick={() => navigate("/")}>
                  <img src="src\assets\home.png" alt="home"
                     className='rounded-full md:size-7 size-5' />
               </li>

               <NavLink className="cursor-pointer hover:text-green-900 transition"
                  // onClick={() => navigate("/products")}
                  to={"/products"}>Products</NavLink>

               {/* <NavLink className="cursor-pointer hover:text-green-900 transition"
                  to={'/signin'}>Signin</NavLink>

               <NavLink className="cursor-pointer hover:text-green-900 transition"
                  to={'/signup'}>Signup</NavLink> */}

               {/* <Link className="cursor-pointer hover:text-green-900 transition"
                  to={"/about"}>About</Link> */}
               <NavLink className="cursor-pointer hover:text-green-900 transition"
                  to={"/about"}>About</NavLink>
               {/* 
               <li className="cursor-pointer hover:text-green-900 transition"
                  onClick={() => navigate("/profile")}>Profile</li> */}

               <NavLink className="cursor-pointer hover:text-green-900 transition"
                  to={"/contact"}>Contact</NavLink>
            </ul>

            {/* RIGHT CART ICON */}
            <div className="flex items-center gap-3 md:gap-6 text-green-700">
               {/* Wishlist item */}
               <SiWish
                  size={25}
                  className="cursor-pointer hover:text-green-900 transition"
                  onClick={() => setWishOpen(true)}
               />

               {/* Cart Icon */}
               <FaCartShopping
                  size={25}
                  className="cursor-pointer hover:text-green-900 transition"
                  onClick={() => setCartOpen(true)}
               />

               {/* Profile Icon */}
               <CgProfile
                  size={25}
                  className="cursor-pointer hover:text-green-900 transition"
                  onClick={() => navigate("/profile")}
               />
            </div>

            <CartSidebar
               open={cartOpen}
               setOpen={setCartOpen}
            />

            <WishSidebar
               open={wishOpen}
               setOpen={setWishOpen} />

         </div>
      </nav>
   )
}

export default NavigationBar

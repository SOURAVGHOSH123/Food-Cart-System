import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaCartShopping } from "react-icons/fa6";
import CartSidebar from './CartSidebar';
import { CgProfile } from "react-icons/cg";
import axios from 'axios';

function NavigationBar() {
   const navigate = useNavigate()
   const [cartOpen, setCartOpen] = useState(false)
   // const [searchItem, setSearchItem] = useState("")
   // const [searchData, setSearchData] = useState("")
   // const [filterProducts, setFilterProducts] = useState([])



   return (
      <nav className="w-full z-999 sticky top-0 bg-amber-300 shadow-md py-3 px-6">

         {/* MAIN FLEX WRAPPER */}
         <div className="flex justify-between items-center">

            {/* LEFT MENU */}
            <ul className="flex gap-3 md:gap-8 text-xs md:text-lg text-green-700 font-medium">
               <li className="cursor-pointer hover:text-green-900 transition"
                  onClick={() => navigate("/")}>Home</li>

               <li className="cursor-pointer hover:text-green-900 transition"
                  onClick={() => navigate("/products")}>Products</li>

               {/* <NavLink className="cursor-pointer hover:text-green-900 transition"
                  to={'/signin'}>Signin</NavLink>

               <NavLink className="cursor-pointer hover:text-green-900 transition"
                  to={'/signup'}>Signup</NavLink> */}

               <Link className="cursor-pointer hover:text-green-900 transition"
                  to={"/about"}>About</Link>
               {/* 
               <li className="cursor-pointer hover:text-green-900 transition"
                  onClick={() => navigate("/profile")}>Profile</li> */}

               <li className="cursor-pointer hover:text-green-900 transition"
                  onClick={() => navigate("/contact")}>Contact</li>
            </ul>

            {/* RIGHT CART ICON */}
            <div className="flex items-center gap-6 text-green-700">
               {/* Cart Icon */}
               <FaCartShopping
                  size={28}
                  className="cursor-pointer hover:text-green-900 transition"
                  onClick={() => setCartOpen(true)}
               />

               {/* Profile Icon */}
               <CgProfile
                  size={28}
                  className="cursor-pointer hover:text-green-900 transition"
                  onClick={() => navigate("/profile")}
               />
            </div>

            <CartSidebar
               open={cartOpen}
               setOpen={setCartOpen}
            />
         </div>
      </nav>
   )
}

export default NavigationBar

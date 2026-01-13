import React, { useContext, useEffect, useState } from "react";
import { PRODUCTS } from "../constant";
import ProductCard from "../components/ProductCard";
import { FaPage4, FaSearch } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import { PAGE_SIZE } from '../utils/constant'
import Pagination from "../components/Pagination";

function ProductPage() {
   const [products, setProducts] = useState([])
   const [categories, setCategories] = useState([])
   const [selectedCategory, setSelectedCategory] = useState("all");
   const [filterProducts, setFilterProducts] = useState([]);
   const [searchItem, setSearchItem] = useState("")
   const [searchData, setSearchData] = useState("")
   const [loading, setLoading] = useState(false)
   const [currentPage, setCurrentPage] = useState(1)
   const [totalPage, setTotalPage] = useState(0)

   useEffect(() => {
      let timer = setTimeout(() => {
         setSearchData(searchItem)
         setCurrentPage(1)
      }, 1000)
      return () => clearTimeout(timer)
   }, [searchItem, selectedCategory])

   useEffect(() => {
      async function fetchCategories() {
         const res = await axios.get("https://dummyjson.com/products?limit=500");
         const cats = [...new Set(res.data.products.map(p => p.category))];
         setCategories(cats);
      }
      fetchCategories();
   }, []);


   useEffect(() => {
      setLoading(true);

      async function fetchProducts() {
         try {
            let url = "https://dummyjson.com/products";
            let params = {
               limit: PAGE_SIZE,
               skip: (currentPage - 1) * PAGE_SIZE
            };

            // 🔍 Search
            if (searchData) {
               url = "https://dummyjson.com/products/search";
               params.q = searchData;
               setSelectedCategory("all")
            }

            // 📦 Category
            else if (selectedCategory !== "all") {
               url = `https://dummyjson.com/products/category/${selectedCategory}`;
            }

            const res = await axios.get(url, { params });
            setProducts(res.data.products);
            setTotalPage(Math.ceil(res.data.total / PAGE_SIZE));
         } catch (err) {
            console.log(err.message);
         } finally {
            setLoading(false);
         }
      }

      fetchProducts();
   }, [searchData, selectedCategory, currentPage]);

   // console.log(totalPage, 'tp')

   // useEffect(() => {
   //    try {
   //       const filteredProduct =
   //          selectedCategory === "all" ? products
   //             : products.filter(p => p.category === selectedCategory);
   //       setFilterProducts(filteredProduct)
   //    } catch (error) {
   //       console.log(error, "FilterProducts Error")
   //    }
   // }, [selectedCategory, products])

   return (
      <div className="w-full min-h-screen bg-gray-50 px-10 md:px-20">

         {/* search Bar */}
         <div className='w-full flex justify-center py-6'>
            <form className='flex items-center gap-2 w-full max-w-lg
                   bg-pink-100 shadow-md rounded-full px-4 py-2'>
               <label htmlFor="search">
                  <FaSearch size={20} className="text-green-700" />
               </label>
               <input type="text" id="search"
                  placeholder='find your product'
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  className='px-2 w-[80%] md:w-[90%] h-auto bg-pink-100
                  border-0 rounded-2xl' />
               {searchItem && <IoCloseCircleSharp type="button" size={19}
                  onClick={() => setSearchItem("")} />}
            </form>
         </div>

         <h1 className="text-4xl font-bold text-gray-900 mb-6">Categories</h1>
         <div className="flex gap-3 overflow-x-auto py-4 mb-8 scrollbar-hide">
            <button
               onClick={() => setSelectedCategory("all")}
               className={`min-w-[80px] px-2 py-2 rounded-lg font-medium border
                  ${selectedCategory === "all"
                     ? "bg-green-600 text-white"
                     : "bg-white text-gray-700"
                  }
            `}
            > All
            </button>

            {categories.map(cat => (
               <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-w-100px] px-2 py-2 rounded-lg font-medium border
                      ${selectedCategory === cat
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-700"
                     }
            `} >
                  {cat.replace("-", " ")}
               </button>
            ))}
         </div>

         <h1 className="text-4xl font-bold text-gray-900 mb-10">Our Products</h1>

         {loading ? <RotatingLines
            visible={true}
            height="80"
            width="80"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
         /> :
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">
               {products.length === 0
                  ? "No products found..."
                  : products.map(item => (
                     <ProductCard item={item} key={item.id} />
                  ))}
            </div>
         }
         <Pagination currentPage={currentPage} total={totalPage} onChange={setCurrentPage} />
      </div>
   );
}

export default ProductPage;

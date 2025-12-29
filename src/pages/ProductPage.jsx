import React, { useContext, useEffect, useState } from "react";
import { PRODUCTS } from "../constant";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { FaSearch } from "react-icons/fa";

function ProductPage() {
   const [products, setProducts] = useState([])
   const [categories, setCategories] = useState([])
   const [selectedCategory, setSelectedCategory] = useState("all");
   const [filterProducts, setFilterProducts] = useState([]);
   const [searchItem, setSearchItem] = useState("")
   const [searchData, setSearchData] = useState("")

   useEffect(() => {
      let timer = setTimeout(() => {
         setSearchData(searchItem)
      }, 1000)
      return () => clearTimeout(timer)
   }, [searchItem])

   useEffect(() => {
      async function fetchApi() {
         // let fetchData = await fetch(`https://dummyjson.com/products/search?q=${searchData}
         // &limit=${PAGE_SIZE}&skip=${(page - 1) * PAGE_SIZE}`)

         let fetchData = await fetch(`https://dummyjson.com/products/search?q=${searchData}&limit=1000`)
         const data = await fetchData.json()
         let category = [... new Set(data.products.map((p) => p.category))]
         console.log(category, "cate")
         setCategories(category)
         setProducts(data.products)
         console.log(data.products, "pdcts")
      }
      fetchApi()
   }, [searchData])

   useEffect(() => {
      const filteredProduct =
         selectedCategory === "all" ? products
            : products.filter(p => p.category === selectedCategory);
      setFilterProducts(filteredProduct)
   }, [selectedCategory, products])

   return (
      <div className="w-full min-h-screen bg-gray-50 px-10 md:px-20">

         {/* search Bar */}
         <div className='w-full flex justify-center py-4'>
            <div className='flex items-center gap-3 w-full max-w-lg
                   bg-white shadow-md rounded-full px-4 py-2'>

               <input type="text" placeholder='search product'
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  className='px-2 w-[90%] h-auto bg-white
                  border-0 rounded-2xl' />
               <FaSearch size={20} />
            </div>
         </div>

         <h1 className="text-4xl font-bold text-gray-900 mb-6">Categories</h1>
         <div className="flex gap-3 overflow-x-auto py-4 mb-8 scrollbar-hide">
            <button
               onClick={() => setSelectedCategory("all")}
               className={`min-w-[80px] px-2 py-2 rounded-lg font-medium border
                  ${selectedCategory === "all"
                     ? "bg-green-600 text-white"
                     : "bg-white text-gray-700"}
                      `}
            > All
            </button>

            {categories.map(cat => (
               <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-w-[100px] px-1 py-2 rounded-lg font-medium border
                      ${selectedCategory === cat
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-700"}
                        `} >
                  {cat.replace("-", " ")}
               </button>
            ))}
         </div>

         <h1 className="text-4xl font-bold text-gray-900 mb-10">Our Products</h1>

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
            {filterProducts.length < 1 ? "No products founds..." : filterProducts.map((item) => (
               <ProductCard item={item} key={item.id} />
            ))}

         </div>

      </div>
   );
}

export default ProductPage;

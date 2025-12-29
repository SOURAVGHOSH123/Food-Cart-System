import React, { createContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const CartContext = createContext(null)

function CartProvider({ children }) {
   const navigate = useNavigate()
   const [cartList, setCartList] = useState([])
   const currentUser = useSelector((state) => state.auth.currentUser)

   useEffect(() => {
      // const currentUser = JSON.parse(localStorage.getItem("currentUser"))
      if (currentUser) {
         const allItems = JSON.parse(localStorage.getItem("items")) || []
         const userCart = allItems.find((p) => p.user === currentUser)
         if (userCart && userCart.items) {
            setCartList(userCart.items);
         }
      }
   }, [currentUser])

   useEffect(() => {
      // const currentUser = JSON.parse(localStorage.getItem("currentUser"))
      if (!currentUser) return;
      if (currentUser) {
         const allItems = JSON.parse(localStorage.getItem("items")) || [];
         const updateItems = allItems.filter((p) => p.user !== currentUser)
         updateItems.push({ user: currentUser, items: cartList });
         localStorage.setItem("items", JSON.stringify(updateItems))
      }
   }, [cartList, currentUser])

   const addToCart = (item) => {
      // console.log(typeof item, item, "item");
      // console.log(typeof value, value, "val");
      // const cUser = useSelector(state => state.auth.currentUser)
      let existItem = cartList.findIndex((p) => item.id === p.id)
      if (existItem !== -1) {
         let temp = [...cartList]
         temp[existItem].quantity += 1
         setCartList(temp)
      } else {
         setCartList((prev) => [...prev, { ...item, quantity: 1 }])
      }
   }

   const increaseQuantity = (id) => {
      let existItem = cartList.findIndex((p) => id === p.id)
      if (existItem !== -1) {
         let temp = [...cartList]
         temp[existItem].quantity += 1
         setCartList(temp)
      } else {
         setCartList((prev) => [...prev, { ...item, quantity: 1 }])
      }
   }

   const decreaseQuantity = (id) => {
      let existItem = cartList.findIndex((p) => id === p.id)
      if (existItem !== -1) {
         let temp = [...cartList]
         if (temp[existItem].quantity == 1) {
            temp.splice(existItem, 1);
         } else {
            temp[existItem].quantity -= 1
         }
         setCartList(temp)
      } else {
         setCartList((prev) => [...prev, { ...item, quantity: 1 }])
      }
   }

   const deleteItem = (itemId, value) => {
      let newData = cartList.filter((item) => item.id !== itemId)
      if (value < 0) {
         newData = cartList.filter((item) => item.id !== itemId)
      }
      setCartList(newData)
   }

   const clearItems = () => {
      setCartList([])
   }

   return (
      <CartContext.Provider value={{ clearItems, addToCart, decreaseQuantity, increaseQuantity, deleteItem, cartList, setCartList }}>
         {children}
      </CartContext.Provider>
   )
}

export default CartProvider
import React, { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import Home from './pages/Home'
// import SignIn from './pages/SignIn'
// import SignUp from './pages/SignUp'
const SignIn = React.lazy(() => import('./pages/SignIn'))
const SignUp = React.lazy(() => import('./pages/SignUp'))
import About from './pages/About'
import NavigationBar from './components/NavigationBar'
import ProductPage from './pages/ProductPage'
import SingleProduct from './components/SingleProduct'
import ContactUs from './pages/ContactUs'
import PublicRoutePractice from './routes/PublicRoutePractice'
import NotFoundPage from './pages/NotFoundPage'
import PrivateRoutePractice from './routes/PrivateRoutePractice'
import CartProvider from './contexts/CartProvider'
// import Profile from './pages/Profile'
// import ForgetPassword from './pages/ForgetPassword'
const Profile = React.lazy(() => import('./pages/Profile'))
const ForgetPassword = React.lazy(() => import('./pages/ForgetPassword'))

import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from './redux/slices/cartSlice'
import PracticeComponenet from './components/PracticeComponenet'
import { ToastContainer } from 'react-toastify'

function App() {
  // const data = useSelector((state) => state.cart.cartItems);
  // const dispatch = useDispatch()
  // console.log(data, "datadata")
  // const handleCart = (item) => {
  //   dispatch(addToCart(item))
  // }
  return (
    <>
      <Suspense fallback={<div>Loading.....</div>}>
        {/* <PracticeComponenet /> */}
        <ToastContainer position="top-right" autoClose={3000} />
        <NavigationBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<PublicRoutePractice />}>
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/forgetPassword' element={<ForgetPassword />} />
          </Route>
          <Route element={<PrivateRoutePractice />}>
            <Route path='/products/:id' element={<SingleProduct />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/products' element={<ProductPage />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutePractice() {
   let token = localStorage.getItem("token")
   // localStorage.setItem("token", "")
   return (
      <div>
         {token ? <Outlet /> : <Navigate to={'/signin'} />}
      </div>
   )
}

export default PrivateRoutePractice
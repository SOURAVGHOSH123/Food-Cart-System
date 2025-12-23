import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
   const token = localStorage.getItem("token");
   return (
      <div>
         {!token ? <Outlet /> : <Navigate to="/about" />}
      </div>
   )
}

export default PublicRoute

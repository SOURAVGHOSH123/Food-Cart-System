import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PublicRoutePractice() {
   const token = localStorage.getItem("token")
   return (
      <div>
         {!token ? <Outlet /> : <Navigate to={'/'} />}
      </div>
   )
}

export default PublicRoutePractice
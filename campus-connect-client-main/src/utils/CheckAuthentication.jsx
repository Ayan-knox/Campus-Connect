import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const CheckAuthentication = () => {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    return (
        isAuthenticated ? <Navigate to='/chat' /> : <Outlet />
    )
}

export default CheckAuthentication
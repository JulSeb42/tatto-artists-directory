// Imports
import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { PageLoading } from "tsx-library-julseb"

import { AuthContext } from "../context/auth"

const AnonRoutes = ({ children, redirectTo }) => {
    const { isLoggedIn, isLoading } = useContext(AuthContext)

    if (isLoading) return <PageLoading />

    return !isLoggedIn ? (
        children
    ) : (
        <Navigate to={redirectTo ? redirectTo : "/"} />
    )
}

export default AnonRoutes

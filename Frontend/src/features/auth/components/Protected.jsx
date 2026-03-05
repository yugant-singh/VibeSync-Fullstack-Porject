import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate, useNavigate } from 'react-router-dom'
import Loader from '../../../shared/components/loader/Loader'



const Protected = ({ children }) => {
    const navigate = useNavigate()
    const { user, loading } = useAuth()
    if (loading) {
        return <Loader />
    }
    if (!user) {
        return <Navigate to={"/login"} />
    }


    return children
}

export default Protected
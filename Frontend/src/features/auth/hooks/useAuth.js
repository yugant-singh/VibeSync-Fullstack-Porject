import { useContext, useEffect } from "react";
import { AuthContext } from '../auth.context'
import { register, login, getMe, logout } from '../services/auth.api'


export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    async function handleLogin({ username, password }) {
        try {
            setLoading(true)
            const data = await login({ username, password })
            setUser(data.user)
        } catch (error) {
            return error.response?.data?.message || "Something went wrong"
        } finally {
            setLoading(false)
        }
    }

    async function handleRegister({ username, email, password, name }) {
        try {
            setLoading(true)
            const data = await register({ username, email, password, name })
            setUser(data.user)
        } catch (error) {
            return error.response?.data?.message || "Something went wrong"
        } finally {
            setLoading(false)
        }
    }

    async function handleGetMe() {
        try {
            setLoading(true)
            const data = await getMe()
            setUser(data.user)
        } catch (error) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    async function handleLogout() {
        try {
            setLoading(true)
            await logout()
            setUser(null)
        } catch (error) {
            return error.response?.data?.message || "Something went wrong"
        } finally {
            setLoading(false)
        }
    }





    return { loading, user, handleRegister, handleLogin, handleGetMe, handleLogout }
}
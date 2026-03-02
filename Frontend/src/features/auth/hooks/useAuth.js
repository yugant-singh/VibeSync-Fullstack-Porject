import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { register, login, getMe } from '../services/auth.api'
export function useAuth() {
    const context = useContext(AuthContext)
    const { loading, setLoading, user, setUser } = context

    const registerHandler = async (name, username, email, password) => {

        setLoading(true)
        try {
            const response = await register(name, username, email, password)
            setUser(response.user)
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }

    }
    const loginHandler = async (identifier, password) => {
        setLoading(true)
        try {
            const response = await login(identifier, password)
            setUser(response.user)
        }
        catch (err) {

            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }
    const getMeHandler = async () => {
        setLoading(false)
        try { 
            const response = await getMe()
            setUser(response.user) 
        }
        catch (err) {

            console.log(err)
        } finally {
            setLoading(false)
         }
    }

    return {loading,user,loginHandler,registerHandler,getMeHandler}

}

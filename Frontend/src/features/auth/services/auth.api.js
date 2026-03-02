import axios from 'axios'
const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

export const register = async (name, username, email, password) => {

    try {
        const response = await api.post("/register", {
            name,
            username,
            email,
            password
        })

        return response.data
    }
    catch (err) {
        console.log(err)

    }

}

export const login = async (identifier, password) => {

    try {
        const response = await api.post("/login", {
           identifier,
            password
        })
        return response.data
    }
    catch (err) {
       throw err
    }
}
export const getMe = async () => {
    try {
        const response = await api.get("/get-me")
        return response.data
    }

    catch (err) {
        console.log(err)
    }
}

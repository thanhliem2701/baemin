const BASE_URL = "http://localhost:3001/auth"

import axios from "axios";


const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            username,
            password
        })
        return response.data
    }
    catch (error) {
        return { error }
    }
}

export { login }
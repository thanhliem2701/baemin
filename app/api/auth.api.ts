const BASE_URL = "http://localhost:3001/auth"

import axios from "axios";


const login = async (username: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password
    })
    console.log(response.data)
    return response.data
}

export { login }
'use client'
const BASE_URL = "http://localhost:3001/menu"

import axios from "axios"

const getAllMenu = async () => {
    try {
        const response = await axios.get(BASE_URL)
        return response.data
    }
    catch (error) {
        return { error }
    }
}

export { getAllMenu }
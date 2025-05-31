'use client'
const BASE_URL = "http://localhost:3001/banneritems"

import axios from "axios"

const getAllBanner = async () => {
    try {
        const response = await axios.get(BASE_URL)
        return response.data
    }
    catch (error) {
        return {error}
    }
 
}

export { getAllBanner }
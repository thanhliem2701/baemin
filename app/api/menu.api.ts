'use client'
const BASE_URL = "http://localhost:3001/menu"

import axios from "axios"

const getAllMenu = async () => {
    const response = await axios.get(BASE_URL)

    console.log(response.data)
    return response.data
}

export { getAllMenu }
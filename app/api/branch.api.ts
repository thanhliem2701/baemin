'use client'
const BASE_URL = "http://localhost:3001/branches"

import axios from "axios"

const getBranchById = async (id: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`)
        return response.data
    }
    catch(error)
    {
        return(error)
    }
}
export {getBranchById}
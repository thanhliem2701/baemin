'use client'
const BASE_URL = "http://localhost:3001/branchmenu"

import axios from "axios"

const getBranchMenuById = async (id: number) => {

    try {
        const response = await axios.get(`${BASE_URL}/${id}`)
        return response.data
    }
    catch(error)
    {
        return(error)
    }
}

const getAllMenuByBranchId = async (branchId: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/branchid/${branchId}`)
        return response.data
    }
    catch(error)
    {
        return(error)
    }
}

export {getBranchMenuById, getAllMenuByBranchId}
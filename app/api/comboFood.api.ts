'use client'
const BASE_URL = "http://localhost:3001/combo-foods"

import axios from "axios"

const getAllFood = async () => {
    try {
        const response = await axios.get(BASE_URL)
        return response.data
    }
    catch (error) {
        return { error }
    }
}

const getFoodByPromotionFlag = async (flag: number[]) => {
    try{
        const response = await axios.get(`${BASE_URL}/promotion/${flag.toString()}`)
        return response.data
    }
    catch (error) {
        return { error }
    }
}

const getComboFoodsByName = async (name: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/name/${name}`)
        return response.data
    }
    catch(error)
    {
        return(error)
    }
}

export { getAllFood, getFoodByPromotionFlag, getComboFoodsByName }
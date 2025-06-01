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
    try {
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
    catch (error) {
        return (error)
    }
}

const getComboFoodsById = async (id: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`)
        return response.data
    }
    catch (error) {
        return (error)
    }
}

const getComboFoodByMenuId = async (menuId: number, branchId: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/menu/${menuId}/branch/${branchId}`)
        return response.data
    }
    catch (error) {
        return (error)
    }
}

export { getAllFood, getFoodByPromotionFlag, getComboFoodsByName, getComboFoodsById, getComboFoodByMenuId }
import axios from "axios";
import { CreateOrderDto } from "../api/type/order";

const BASE_URL = "http://localhost:3001/orders"


const createOrder = async (orderData: CreateOrderDto) => {
    const token = localStorage.getItem('accessToken');
  try {
    const response = await axios.post(`${BASE_URL}/create`, orderData,{
        headers: {
            Authorization: token,
        }
    });
    return response.data;
  } catch (error: any) {
    console.error('Đặt hàng thất bại:', error?.response?.data || error.message);
    throw error;
  }
};

export { createOrder }
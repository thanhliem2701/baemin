'use client'
const BASE_URL = "http://localhost:3001/sendmail"

import axios from "axios";

type OrderSummary = {
    shippingFee: number;
    finalTotal: number;
    selectedVoucher: number;
    voucherText: string;
    totalQuantity: number;
    totalPrice: number;
    userFullName: string;
    userEmail: string;
}

const sendMail = async (orderSummary: OrderSummary ) => {
    try {
        const response = await axios.post(`${BASE_URL}`, orderSummary)
        return response.data
    }
    catch (error) {
        return { error }
    }
}
export { sendMail }
'use client'

import { AccountBookOutlined, CompassOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import DetailsCheckout from "./detailsCheckout";
import { useRouter } from "next/navigation";
import { useSession } from "../context/sessionContext";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { sendMail } from "../api/sendMail.api";
import { CreateOrderDto } from "../api/type/order";
import { createOrder } from "../api/order.api";
import Commet from "react-loading-indicators/Commet";

export default function Home() {
    const { cart, clearCart, user } = useSession();
    const router = useRouter();
    const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState<number>(0);
    const [voucherText, setVoucherText] = useState<string>('')
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.totalprice, 0);
    const shippingFee = 15000;
    const finalTotal = totalPrice + shippingFee - selectedVoucher;
    const [loading, setLoading] = useState(false);

    const handleNavigate = async () => {

        //create data to send mail
        const orderSummary = {
            shippingFee,
            finalTotal,
            selectedVoucher,
            voucherText,
            totalQuantity,
            totalPrice,
            userFullName: [user.first_name, user.last_name].filter(Boolean).join(' '),
            userEmail: user.email,
        };

        localStorage.setItem('orderSummary', JSON.stringify(orderSummary));
        setLoading(true);

        //send confirm email
        await sendMail(orderSummary)

        // Create data for order
        const orderDetails = cart.map((item) => ({
            food_id: item.id,
            name: item.namefood,
            quantity: item.quantity,
            amount: item.totalprice,
        }));
        //call api order
        const orderData: CreateOrderDto = {
            user_id: user.id,
            user_name: [user.first_name, user.last_name].filter(Boolean).join(' '),
            user_phone: user.phone,
            delivery_address: user.address,
            total_price: orderSummary.finalTotal,
            discount_code: orderSummary.voucherText,
            discount_amount: orderSummary.selectedVoucher,
            orderDetails,
        };
        try {
            const result = await createOrder(orderData);
        } catch (err) {
            console.log(err)
            alert('Lỗi khi đặt hàng.');
            return;
        } finally {
            setLoading(false);
        }

        Modal.info({
            title: 'Xác nhận đơn hàng',
            content: 'Đơn đặt hàng đã được xác nhận, vui lòng kiểm tra email để theo dõi tiến trình giao hàng !',
            onOk() {
                clearCart();
                router.push('/statusorder');
            },
            okText: 'Xác nhận'
        })
    };
    if (loading) return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <Commet color="#32cd32" size="medium" />
        </div>
    );

    return (
        <>
            <div className="flex flex-row w-full h-20 bg-white ">
                <div className="w-1/2 h-full flex flex-row  items-center gap-3">
                    <div className="ml-10 text-4xl  text-beamin font-bold" >
                        <ShoppingCartOutlined />
                    </div>
                    <div className="text-2xl  text-beamin ">
                        |
                    </div>
                    <div className="text-3xl  text-beamin font-bold">
                        Thanh Toán
                    </div>
                </div>
                <div className="w-1/2 h-full flex   items-center gap-3">


                </div>
            </div>
            <div className="px-16 flex flex-col gap-3 ">'
                {user ? (
                    <div className="w-full h-28 flex flex-col bg-white rounded-md pl-10 pt-5">
                        <div className="flex flex-row gap-1">
                            <div className="text-xl">
                                <svg version="1.1" viewBox="0 0 2048 2048" width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#3AC5C9" transform="translate(1e3 353)" d="m0 0h48l30 3 28 5 32 8 29 10 27 12 23 12 24 15 18 13 14 11 11 10 8 7 21 21 7 8 13 16 13 18 14 22 12 22 11 23 11 29 8 28 6 28 4 29 2 33v12l-1 23-3 27-5 28-7 27-10 30-11 26-12 26-16 36-18 40-12 27-36 80-18 41-16 35-16 36-18 40-12 27-36 80-11 25-13 29-19 42-32 72-19 42-18 40-13 30-16 35-2 3-8-16-18-40-18-41-17-37-32-72-13-29-36-80-11-25-36-80-20-45-36-80-28-63-19-42-17-38-16-36-13-29-18-40-11-27-9-29-7-30-4-26-2-20v-55l3-28 5-28 7-28 11-32 11-25 13-25 13-21 12-17 10-13 12-14 12-13 16-16 8-7 14-12 18-13 15-10 15-9 18-10 28-13 28-10 25-7 28-6 31-4zm7 183-27 4-25 7-19 8-19 10-16 11-11 9-10 9-11 11-11 14-9 13-8 14-8 16-9 27-4 19-2 15v38l3 21 4 17 7 21 10 21 12 19 10 13 9 10 7 8 8 7 12 10 15 10 16 9 15 7 24 8 25 5 7 1 24 1 20-1 24-4 21-6 20-8 21-11 17-12 11-9 14-13 7-8 11-14 10-15 11-21 9-24 6-26 2-15v-39l-4-26-6-21-6-16-8-16-8-14-14-19-12-13-11-11-14-11-13-9-16-9-17-8-21-7-23-5-16-2z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-beamin">Địa chỉ giao hàng</span>
                        </div>
                        <div className="pl-3 flex flex-row gap-5 items-center mb-3 mt-3">
                            <span className="font-bold" >{user.first_name} &nbsp; {user.last_name} &nbsp; phone : {user.phone} </span>
                            <span>{user.address}</span>
                            <div className="border border-solid border-beamin p-1 text-xs text-beamin" > Mặc định  </div>
                            <span className="ml-3 text-blue-600 text-sm cursor-pointer "> Thay đổi </span></div>
                    </div>
                ) : (<div className="pl-3 mb-3 mt-3 text-sm text-red-600">
                    Bạn chưa đăng nhập. <span className="text-blue-600 underline cursor-pointer" onClick={() => router.push('/login')}>Đăng nhập ngay</span>
                </div>
                )}


                <div className="w-full bg-white rounded-md  flex flex-col pt-5 ">
                    <DetailsCheckout items={cart} />
                    <div className="border-t w-full  mt-4">
                        <div className="ml-[40%]  flex flex-row justify-between items-center py-2 " >
                            <div className=" flex flex-row items-center gap-3">
                                <div className="text-beamin text-xl">
                                    <AccountBookOutlined />
                                </div>
                                <span className="text-base"> Voucher của bạn :  &nbsp;  <span className="font-bold">{voucherText}</span></span>
                            </div>
                            <div onClick={() => setIsVoucherModalOpen(true)} className="pr-10 text-blue-600 cursor-pointer">
                                Chọn Voucher
                            </div>
                        </div>
                    </div>
                    <div className="border-t w-full grid grid-cols-12 h-28">
                        <div className="col-span-5 border-r pt-4 pl-9 pb-10 flex flex-row items-center gap-3">
                            <span className="text-nowrap">Lời Nhắn:</span>
                            <input type="text" placeholder="Lưu ý cho người bán" className="border-gray-300  focus-visible:border-beamin border border-solid  mr-3  w-full h-8 pl-1" ></input>
                        </div>
                        <div className="col-span-7">
                            <div className=" grid grid-cols-12 pt-4">
                                <div className="col-span-4 pt-3 text-sm ml-3">
                                    Phương thức vận chuyển:
                                </div>
                                <div className="col-span-4 flex flex-col gap-1">
                                    <span className="font-bold">Vận chuyển tiết kiệm</span>
                                    <span className="text-sm">Giao hàng từ 15-30 phút</span>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-blue-600 text-sm cursor-pointer"> Thay đổi</span>
                                </div>
                                <div className="col-span-2">
                                    <span className=" text-sm"> {shippingFee.toLocaleString('en-US')} ₫</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t w-full  h-16 flex justify-end pr-5 gap-2 items-center">
                        <span>Tổng số tiền ({totalQuantity} sản phẩm):
                        </span>
                        <span className="text-beamin font-bold">
                            {totalPrice.toLocaleString("en-US")} ₫
                        </span>
                    </div>
                </div>
                <div className="w-full  flex flex-col bg-white rounded-md  pt-5 gap-3">
                    <div className="flex flex-row gap-3 pl-10 mb-4">
                        <div className="font-medium">
                            Phương Thức Thanh toán:
                        </div>
                        <div className="border border-solid border-gray-300 p-1 cursor-pointer hover:border-beamin hover:text-beamin  active:border-beamin active:text-beamin">
                            MoMo
                        </div>
                        <div className="border border-solid border-gray-300 p-1 cursor-pointer hover:border-beamin hover:text-beamin  active:border-beamin active:text-beamin">
                            ZaloPay
                        </div>
                        <div className="border border-solid border-gray-300 p-1 cursor-pointer hover:border-beamin hover:text-beamin  active:border-beamin active:text-beamin">
                            Thẻ tín dụng/ Thẻ ghi nợ
                        </div>
                        <div className="border border-solid border-gray-300 p-1 cursor-pointer hover:border-beamin hover:text-beamin  active:border-beamin active:text-beamin">
                            Thanh toán khi nhận hàng
                        </div>

                    </div>
                    <div className="w-full   border-t flex flex-col justify-end items-end pt-4  gap-4">
                        <div className="flex justify-between w-[30%] ">
                            <div className="text-sm text-gray-900">
                                Tổng tiền hàng
                            </div>
                            <div className="text-sm mr-5">
                                {totalPrice.toLocaleString("en-US")} ₫
                            </div>
                        </div>
                        <div className="flex justify-between w-[30%] ">
                            <div className="text-sm text-gray-900">
                                Phí vận chuyển

                            </div>
                            <div className="text-sm mr-5">
                                {shippingFee.toLocaleString('en-US')} ₫
                            </div>
                        </div>
                        <div className="flex justify-between w-[30%] ">
                            <div className="text-sm text-gray-900">
                                Tổng cộng Voucher giảm giá:
                            </div>
                            <div className="text-sm mr-5">
                                - {selectedVoucher.toLocaleString("en-US")} ₫
                            </div>
                        </div>
                        <div className="flex justify-between w-[30%] ">
                            <div className="text-sm text-gray-900">
                                Tổng thanh toán
                            </div>
                            <div className="text-2xl mr-5 text-beamin">
                                {finalTotal.toLocaleString("en-US")} ₫
                            </div>
                        </div>
                    </div>
                    <div className="w-full border-t  flex flex-row justify-between items-center  pt-4  gap-4 mb-4">
                        <div className="w-[70%] ml-8">
                            Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo <span className="text-blue-600 text-sm cursor-pointer">Điều khoản Baemin</span>
                        </div>
                        <div className="w-[30%] pl-48 ">
                            <button onClick={handleNavigate} className="p-1 bg-beamin text-white w-36 rounded-md h-10 hover:brightness-105">
                                Đặt hàng
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <Modal
                title="Chọn Voucher"
                open={isVoucherModalOpen}
                onCancel={() => setIsVoucherModalOpen(false)}
                footer={null}
            >
                {[
                    { label: "VOUCHER10K", value: 10000 },
                    { label: "VOUCHER20K", value: 20000 },
                    { label: "VOUCHER50K", value: 50000 },
                    { label: "VOUCHER100K", value: 100000 },
                ].map((voucher) => (
                    <div
                        key={voucher.value}
                        onClick={() => {
                            setSelectedVoucher(voucher.value);
                            setIsVoucherModalOpen(false);
                            setVoucherText(voucher.label)
                        }}
                        className="cursor-pointer hover:bg-gray-100 p-2 rounded border mb-2"
                    >
                        {voucher.label} - Giảm {voucher.value.toLocaleString("vi-VN")} ₫
                    </div>
                ))}
            </Modal>
        </>

    )


}
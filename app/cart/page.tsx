'use client'
import HeaderNav from "@/components/headerNav";
import ScrollBar from "@/components/scrollBar";
import ScrollFood from "@/components/scrollFood";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DetailsCart from "./detailsCart";
import { Button, Modal } from "antd";
import { useSession } from "../context/sessionContext";
import { useRouter } from "next/navigation";

export default function Home() {
    const { cart, clearCart } = useSession();
    const session = useSession();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const totalQuantity = cart.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const { user } = useSession();
    const showConfirmModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        clearCart();
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const hanleCheckOut = () => {
        if (!user) {
            Modal.warning({
                title: "Yêu cầu đăng nhập",
                content: "Bạn cần đăng nhập để tiếp tục thanh toán.",
                onOk: () => router.push('/login'),
            });
            return;
        }
        router.push('/checkout')
    }
    return (<>
        <div className="flex flex-row w-full h-20 bg-white ">
            <div className="w-1/2 h-full flex flex-row  items-center gap-3">
                <div className="ml-10 text-4xl  text-beamin font-bold" >
                    <ShoppingCartOutlined />
                </div>
                <div className="text-2xl  text-beamin ">
                    |
                </div>
                <div className="text-3xl  text-beamin font-bold">
                    Giỏ hàng
                </div>
            </div>
            <div className="w-1/2 h-full flex   items-center gap-3">


            </div>
        </div>
        <div className="mt-4 px-16 flex flex-col gap-4  pb-16 rounded-md">
            <div className=" w-full h-16  bg-white  grid grid-cols-12">
                <div className="pl-8  col-span-4 flex items-center flex-row gap-5">
                    <span className="text-base font-normal" > Món Ăn</span>
                </div>
                <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                    <span className="text-base font-normal  text-gray-600" >Đơn giá</span>
                </div>
                <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                    <span className="text-base font-normal  text-gray-600" >Số lượng</span>
                </div>
                <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                    <span className="text-base font-normal  text-gray-600" >Số tiền</span>
                </div>
                <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                    <span className="text-base font-normal  text-gray-600" >Thao tác</span>
                </div>
            </div>

            <DetailsCart Details={cart} />
            {cart.length > 0 ?
                <div className=" flex flex-row fixed bottom-0  w-[90.6%]  mr-16  h-16 bg-white items-center  " >
                    <div className="flex flex-row gap-2 w-1/2 h-full items-center ml-10">
                        <div onClick={showConfirmModal} className="cursor-pointer hover:text-red-600 " >Hủy</div>
                        <div> </div>
                        <div> </div>
                    </div>
                    <div className="flex flex-row gap-2 w-1/2 h-full items-center justify-end pr-2">
                        <div className=""> Tổng thanh toán ({totalQuantity} Sản phẩm):
                        </div>
                        <div className="text-red-600" >{Number(totalPrice).toLocaleString('en-US')} ₫ </div>
                        <div>
                            <Button onClick={hanleCheckOut} style={{ 'background': '#3AC5C9', color: 'white' }} className="bg-beamin text-white w-40 h-10 rounded-md hover:brightness-105" >Thanh toán</Button>
                        </div>
                    </div>
                </div>
                : ''}

        </div>
        <Modal
            title="Xác nhận xóa giỏ hàng"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
        >
            <p>Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?</p>
        </Modal>
    </>)
}
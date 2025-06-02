'use client'
import { Button } from "antd";
import { Butterfly_Kids } from "next/font/google";
import Image from "next/image";
import React from "react";
import { useSession } from "../context/sessionContext";
import type { CartItem } from "../context/sessionContext";

export default function DetailsCart({ Details }: { Details: CartItem[] }) {
    const { setCart } = useSession();

    const handleQuantityChange = (id: number, newQuantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: newQuantity,
                        totalprice: newQuantity * item.price,
                    }
                    : item
            )
        );
    };

    const handleRemove = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    return (
        <>
            {Details.map((items, index) => (
                <div className="w-full flex flex-col  bg-white rounded-md ">
                    <div className=" w-full border-t border-b border-solid border-gray-600 py-3">
                        <div key={index} className={"w-full grid grid-cols-12 border-b border-solid border-x-gray-300"} >
                            <div className="pl-8  col-span-4 flex items-center flex-row gap-3">
                                <div className="relative h-36 w-36">
                                    <Image layout="fill" objectFit="cover" src={items.img} alt={""} />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="text-base ">{items.namefood}</span>
                                    <span className="text-sm text-gray-600">{items.description}</span>
                                </div>
                            </div>
                            <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                {Number(items.price).toLocaleString('en-US')} ₫
                            </div>
                            <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                <input type="number" id="quantity" className="w-16 text-center border border-gray-300 rounded" 
                                value = {items.quantity}
                                min="1" max="100" 
                                onChange={(e) => handleQuantityChange(items.id, Number(e.target.value))}/>

                            </div>
                            <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                {Number(items.totalprice).toLocaleString('en-US')} ₫
                            </div>
                            <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                <span onClick={() => handleRemove(items.id)} className=" hover:text-red-600 cursor-pointer">Xóa</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
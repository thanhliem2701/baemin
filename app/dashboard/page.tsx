'use client'

import HeaderNav from "@/components/headerNav";
import ScrollBar from "@/components/scrollBar";
import ScrollFood from "@/components/scrollFood";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getAllMenu } from "../api/menu.api"
import { getAllBanner } from "../api/banner.api"
import { getFoodByPromotionFlag } from "../api/comboFood.api";
import { useSession } from "../context/sessionContext";

type MenuItem = {
    name: string;
    imgsrc: string;
    description: string;
};

type BannerItem = {
    id: number;
    name: string;
    url: string;
    imgsrc: string;
};
type FoodItem = {
    id: number;
    menu_id: number;
    name: string;
    description: string;
    price: number;
    img: string;
    promotion_flag: number;
    tag: string;
};

export default function Home() {
    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [banner, setBanner] = useState<BannerItem[]>([]);
    const [food, setFood] = useState<FoodItem[]>([]);
    const [combo, setCombo] = useState<FoodItem[]>([]);
    const session = useSession();
    useEffect(() => {
        // get menu to display on left side
        getAllMenu()
            .then((response) => {
                setMenu(response)
            })
            .catch((error) => {
                console.log(error)
            })
        // get all scroll banner
        getAllBanner()
            .then((response) => {
                setBanner(response)
            })
            .catch((error) => {
                console.log(error)
            })
        // get combo and promotion item
        getFoodByPromotionFlag([0,1])
            .then((response:FoodItem[]) => {
                const foodItems = response.filter((item) => item.promotion_flag === 1);
                const comboItems = response.filter((item) => item.promotion_flag === 0);
                setFood(foodItems) // promotion_flag: 0 Combo
                setCombo(comboItems) // promotion_flag: 1 khuyến mãi
            })
            .catch((error) => {
                console.log(error)
            });
    }, [])

    return (
        <>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3 pt-3 pl-8 pr-8  z-40">
                    <div className="flex flex-col fixed  bg-white w-64 rounded-2xl  pl-3 pt-2  pb-5 gap-3  ">
                        <span>Thực đơn </span>
                        {menu.map((item, index) => (
                            <div key={index} className="flex flex-col gap-3 cursor-pointer hover:bg-slate-100">
                                <div className="flex flex-row items-center gap-1">
                                    <Image src={item.imgsrc} width={30} height={30} alt={item.description} />
                                    <span>{item.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-9 w-full  pt-3 pr-8 gap-3 flex flex-col">
                    <ScrollBar items={banner} ></ScrollBar>
                    <ScrollFood items={food} title={"Các món đang khuyến mãi hấp dẫn !!!"}></ScrollFood>
                    <ScrollFood items={combo} title={"Combo nổi bật !!!"}></ScrollFood>
                </div>

            </div>

        </>
    )
}
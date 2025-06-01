'use client'
import { ShoppingCartOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import TypeSelector from './type';
import AreaSelector from './area';
import FilterSelector from './filter';
import ResultFood from './result';
import { getComboFoodsByName } from "../api/comboFood.api";
import { useRouter, useSearchParams } from "next/navigation";

type FoodItem = {
    id: number;
    menu_id: number;
    name: string;
    description: string;
    price: number;
    img: string;
    promotion_flag: number;
    tag: string
};

const Page: React.FC = () => {
    const searchParams = useSearchParams();
    const name = searchParams?.get('name');
    const [food, setFood] = useState<FoodItem[]>([]);

    useEffect(() => {
        try {
            if (typeof name === 'string' && name.trim() !== '') {
                getComboFoodsByName(name ?? "")
                    .then((response) => {
                        setFood(response)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }else {
                alert("vui lòng nhập tên cần tìm kiếm !")
            }

        }
        catch (err) {
            console.log(err)
        }
    }, [name])

    return (
        <>
            <div className='w-full flex flex-row justify-between items-center border-b border-solid'>
                <div className='flex flex-row gap-3'>
                    <AreaSelector />
                    <TypeSelector />
                </div>
                <div className='flex items-center justify-center '>
                    <FilterSelector></FilterSelector>
                </div>

            </div>
            <div className='my-3 flex flex-row'>

            </div>
            <ResultFood items={food} />
        </>
    )
}
export default Page;
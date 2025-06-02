'use client'
import HeaderNav from "@/components/headerNav";
import ScrollBar from "@/components/scrollBar";
import ScrollFood from "@/components/scrollFood";
import { ClockCircleOutlined, ClockCircleTwoTone, DollarOutlined, DollarTwoTone, DoubleRightOutlined, LikeFilled, PlusOutlined, SearchOutlined, StarFilled, StarOutlined, StarTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getAllMenuByBranchId } from "../api/branchMenu.api";
import { getComboFoodByMenuId } from "../api/comboFood.api";
import { useSearchParams } from "next/navigation";
import { getBranchById } from "../api/branch.api"
import { useSession } from "../context/sessionContext";
import { useRouter } from "next/navigation";

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
type Menu = {
    id: number;
    name: string;
    icon: string;
    branch_id: number;
    menu_flag: number;
}
type Branch = {
    id: number;
    name: string;
    address: string;
    img: string;
    tradinghour: string;
    pricerange: string;
    total_rating: number;
    number_of_rating: number;
    company_id: number;
}

export default function Home() {

    const [isActive, setIsActive] = useState<number>(-1);
    const [menu, setMenu] = useState<Menu[]>([])
    const [branch, setBranch] = useState<Branch>()
    const [menuName, setMenuName] = useState<string>("")
    const branchParam = useSearchParams()
    const branchId = Number(branchParam?.get('branch_id'));
    const [foods, setFoods] = useState<FoodItem[]>([])
    const session = useSession();
    const { addToCart } = useSession();
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            if (branchId !== null && !isNaN(branchId)) {
                try {
                    //get branch
                    const branchRes = await getBranchById(branchId)
                    setBranch(branchRes)

                    //get menu by branch
                    const menuRes = await getAllMenuByBranchId(branchRes.id)
                    setMenu(menuRes)

                    const foodRes = await getComboFoodByMenuId(isActive, branchId)
                    setFoods(foodRes)
                }
                catch (error) {
                    alert("Can not get branch")
                }
            }
        }
        fetchData();
    }, [branchId, isActive])

    const handleMouseDown = (id: number, name: string) => {
        setIsActive(id);
        setMenuName(name);
    };

    const handleMouseUp = (id: number, name: string) => {
        setIsActive(id);
        setMenuName(name);
    };

    const renderStars = (rating: number) => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<StarFilled key={i} />);
            } else if (rating >= i - 0.5) {
                stars.push(<StarTwoTone key={i} twoToneColor="#eb2f96" />);
            } else {
                stars.push(<StarOutlined key={i} />);
            }
        }
        return stars;
    };

    const customItem = {
        id: -1,
        name: "TẤT CẢ",
        icon: "",
        branch_id: branch?.id ?? 0,
        menu_flag: 4,
    };

    const displayMenu = menu ? [customItem, ...menu] : [customItem];
    return (<>
        <div className="flex flex-col w-full h-auto">
            <div className="bg-white w-full h-80 flex">
                <div className="w-[45%] h-full py-4 px-10">
                    <div className="w-full relative h-full" >
                        <Image fill style={{ objectFit: "cover" }} src={branch ? branch.img : "/food/ga1.jpg"} alt="Ga"></Image>
                    </div>
                </div>
                <div className=" w-[55%] h-full relative">
                    <div className="absolute top-0 left-0 px-8 py-4">
                        <span className="text-[13px] text-[#187CAA]"><a onClick={() => router.push("/dashboard")} >Home</a>
                            <DoubleRightOutlined className="text-[10px]" /> <a href="">{branch ? branch.name : ""}</a> </span>
                        <div className="flex flex-row text-[11px] justify-start items-center mt-3">
                            <div className="bg-beamin text-white p-1 mr-2 cursor-pointer tracking-wider flex gap-1">
                                <LikeFilled />
                                <span>Yêu thích</span>
                            </div>
                            <span className="text-[#959595]">QUÁN ĂN - <a href="" className="text-[#0288D1]">Chi nhánh</a></span>
                        </div>
                        <div className="text-[22px] font-bold mt-2">{branch ? branch.name : ""}</div>
                        <div className="text-[13px] mt-1">
                            {branch ? branch.address : ""}
                        </div>
                        <div className="flex flex-row text-[14px] gap-2 justify-start items-center">
                            <ol className="flex flex-row text-[#FFC107] gap-1">
                                {renderStars(branch?.total_rating || 0)}
                            </ol>
                            <p className="bg-[#FFC107] py-[2px] px-1 text-white rounded-md">
                                {branch ? branch.number_of_rating : ""}
                            </p>
                            <span>đánh giá trên Baemin</span>
                        </div>
                        <div className="flex flex-row gap-4 justify-start items-center my-1 text-[15px]">
                            <div className="flex flex-row gap-1 text-[#6CC942] justify-start items-center">
                                <div className="w-2 h-2 bg-[#6CC942] rounded-full"></div>
                                <span>Mở cửa</span>
                            </div>
                            <div className="flex flex-row gap-1 justify-start items-center">
                                <ClockCircleTwoTone twoToneColor={"#3AC5C9"} />
                                <span>{branch ? branch.tradinghour : ""}</span>
                            </div>
                        </div>
                        <div className="flex flex-row gap-1 justify-start items-center text-[#959595] text-[15px]">
                            <DollarTwoTone twoToneColor={"#c0c0c0"} className="text-[16px]" />
                            <span>{branch ? branch.pricerange : ""}</span>
                        </div>
                    </div>

                    <div className="w-full flex flex-col absolute bottom-0 left-0 px-8 mb-4 text-[#959595] text-[13px]">
                        <div className="border-t-[1px]"></div>
                        <div className="flex flex-row gap-4 justify-start items-center py-[10px]">
                            <div className="flex flex-col ">
                                <span>PHÍ DỊCH VỤ</span>
                                <span className="text-beamin font-bold text-[14px]">0.8% Phí dịch vụ</span>
                            </div>
                            <div className="border-l border-solid h-6"></div>
                            <div className="flex flex-col">
                                <span>DỊCH VỤ BỞI</span>
                                <span className="text-beamin font-bold text-[14px]">Baemin</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <div className="py-[13px] px-[26px] font-bold text-beamin text-[14px]">THỰC ĐƠN</div>
                <div className="w-full flex flex-row gap-3">
                    <div className="w-[20%] bg-white p-5">
                        <ul>
                            {Array.isArray(displayMenu) && displayMenu.map((item: Menu, index: any) => (
                                <li key={item.id}
                                    className={`cursor-pointer mt-2 w-fit px-2 py-1 flex flex-row items-center gap-2
                                         ${isActive === item.id ? 'bg-[#959595] text-white' : ''}`}
                                    onMouseDown={() => handleMouseDown(item.id, item.name)}
                                    onMouseUp={() => handleMouseUp(item.id, item.name)}
                                >
                                    {item.icon && (<Image src={item.icon} alt="icon" width={16} height={16} />)}
                                    <span className="whitespace-nowrap">{item.name.toUpperCase()}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-[50%] h-auto bg-white py-3 flex flex-col px-4">
                        <div className="w-full mb-5">
                            <Input addonBefore={<SearchOutlined />} placeholder="" />
                        </div>
                        <div className="flex flex-col w-full pl-1 gap-3">
                            <div className="font-medium">
                                {menuName.trim() === "" ? "TẤT CẢ" : menuName.toUpperCase()}
                            </div>
                            <div className="flex flex-col w-full gap-43 border-b gap-y-[2px]">

                                {Array.isArray(foods) && foods.map((item: FoodItem, index: any) => (
                                    <div key={item.id} className="flex flex-row ">
                                        <div className="w-[15%] relative h-16">
                                            <Image fill style={{ objectFit: "cover" }} src={item.img} alt="s" ></Image>
                                        </div>
                                        <div className="w-[60%] flex flex-col gap-1 px-2">
                                            <span className="font-bold text-[#464646] ">{item.name} </span>
                                            <span className="text-wrap text-sm text-[#464646] " >{item.description}</span>
                                        </div>
                                        <div className="w-[15%] flex justify-center items-center">
                                            <span className="text-[#0288d1] font-bold text-base">{Number(item.price).toLocaleString('en-US')} đ</span>
                                        </div>

                                        <div onClick={() => {
                                            addToCart({
                                                id: item.id,
                                                namefood: item.name,
                                                description: item.description,
                                                price: item.price,
                                                quantity: 1,
                                                img: item.img, // or another suitable value for icon
                                                totalprice: item.price * 1, // or another suitable calculation for amount
                                            })
                                        }} className="w-[10%] flex justify-center items-center">
                                            <div className="h-6 w-6 rounded-md flex justify-center items-center bg-beamin text-white font-bold cursor-pointer hover:brightness-110 " >
                                                <PlusOutlined />
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-[30%] bg-white"></div>
                </div>
            </div>

        </div>
    </>)
}
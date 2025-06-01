'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getBranchMenuById } from "../api/branchMenu.api";
export default function ResultFood({ items }: { items: any[] }) {
    const router = useRouter();

    const handleNavigate = (menu_id: number) => {
        getBranchMenuById(menu_id)
            .then((response) => {
                router.push(`/detailfood?branch_id=${response.branch_id}`);
            })
            .catch((error) => {
                console.log(error)
            })};
    return (
        <>
            <div className='mt-3 flex flex-row flex-wrap gap-3 '>
                {items.map((item: any) => (
                    <div onClick={() => handleNavigate(item.menu_id)} key={item.id} className='group w-[19%] h-56 bg-white flex flex-col cursor-pointer'>
                        <div className='group-hover:brightness-105 w-full h-[60%] relative'>
                            <Image layout="fill" objectFit="cover" src={item.img} alt={""}></Image>
                        </div>
                        <div className='group-hover:bg-slate-50 w-full h-[40%] pr-3  border border-solid'>
                            <div className="ml-3  w-full truncate text-base h-[30%] ">
                                <span className='font-bold text-[#252525]'> {item.name} </span>
                            </div>
                            <div className="ml-3 w-full truncate text-sm  h-[30%]" style={{ color: '#959595' }}>
                                <span>{item.description}</span>
                            </div>
                            <div className=" flex items-center w-full text-sm border-t  border-beamin-50  h-[30%]">
                                {/* <span className="ml-3 ">{item.kind}</span> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>

    )

}
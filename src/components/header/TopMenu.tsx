"use client"

import { useAuthStore } from '@/src/store/authStore';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import IconBox from '../svg/IconBox';


const TopMenu = () => {
    const pathName = usePathname();
    const isCatalogPage = pathName === "/catalog";
    const { user } = useAuthStore();

     const isManagerOrAdmin = user?.role === "manager" || user?.role === "admin";


  return (
    <>
        <ul className='flex flex-row gap-x-6 items-end'>
            {!isManagerOrAdmin && (
            <Link href="/catalog">
              <li className='flex flex-col  items-center gap-2  w-11 cursor-pointer'>
                <Image 
                src="/лого хедера/HeaderBtnCatalog.svg" 
                alt='Каталог'
                width={24}
                height={24}
                className='object-contain w-6 h-6'/>
                <span className={isCatalogPage ? "text-[#ff6633]" : "text-[#414141]"}>Каталог</span>
            </li>
            </Link>
            )}
             {!isManagerOrAdmin && (
        <li className='flex flex-col items-center gap-2  w-11 cursor-pointer'>
                <Image 
                src="/лого хедера/HeaderUserBockHeart.svg" 
                alt='Обранне'
                width={24}
                height={24}
                className='object-contain w-6 h-6'/>
                <span>Обранне</span>
            </li>
       )}
          
           
            <li className='flex flex-col items-center   w-11 cursor-pointer'>
               <IconBox/>
                <span className={isManagerOrAdmin ? "text-[#ff6633]" : ""}>Замовлення</span>
            </li> 
            {!isManagerOrAdmin && (
            <li className='flex flex-col items-center gap-2  w-11 cursor-pointer'>
                <Image 
                src="/лого хедера/HeaderUserBlockCartBox.svg" 
                alt='Кошик'
                width={24}
                height={24}
                className='object-contain w-6 h-6'/>
                <span>Кошик</span>
            </li>
            )}
        </ul>
    </>
  )
}

export default TopMenu
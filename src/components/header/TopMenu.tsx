'use client';

import { useAuthStore } from '@/src/store/authStore';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import IconBox from '../svg/IconBox';
import IconHeart from '../svg/iconHeart';
import IconCart from '../svg/IconCart';
import { useCartStore } from '@/src/store/cartStore';
import { useEffect } from 'react';

const TopMenu = () => {
    const pathName = usePathname();
    const isCatalogPage = pathName === '/catalog';
    const { user } = useAuthStore();
    const isFavoritePage = pathName === '/favorite';
    const isCartPage = pathName === '/cart';
    const isUserOrdersPage = pathName === "/user-orders";
    const { totalItems, fetchCart } = useCartStore();

    const isManagerOrAdmin = user?.role === 'manager' || user?.role === 'admin';

 useEffect(() => {
    if (user && !isManagerOrAdmin) {
        fetchCart();
    }
}, [user, isManagerOrAdmin, fetchCart]);

    return (
        <>
            <ul className="flex flex-row gap-x-6 items-end">
                {!isManagerOrAdmin && (
                    <li className="flex flex-col  items-center gap-2  w-11 cursor-pointer">
                        <Link
                            href="/cart"
                            className="flex flex-col  items-center gap-2  w-11 cursor-pointer"
                        >
                            <Image
                                src="/лого хедера/HeaderBtnCatalog.svg"
                                alt="Каталог"
                                width={24}
                                height={24}
                                className="object-contain w-6 h-6 "
                            />
                            <span
                                className={
                                    isCatalogPage
                                        ? 'text-[#ff6633]'
                                        : 'text-main-text'
                                }
                            >
                                Каталог
                            </span>
                        </Link>
                    </li>
                )}
                {!isManagerOrAdmin && (
                    <li className="relative flex-col items-center gap-2 w-11 cursor-pointer">
                        <Link
                            href="/favorite"
                            className="flex flex-col items-center gap-2"
                        >
                            <IconHeart isActive={isFavoritePage} />

                            <span
                                className={
                                    isFavoritePage
                                        ? 'text-[#ff6633]'
                                        : 'text-main-text'
                                }
                            >
                                Обранне
                            </span>
                        </Link>
                    </li>
                )}

                <li className="flex flex-col items-center   w-11 cursor-pointer">
                    <IconBox />
                    <span className={isManagerOrAdmin ? 'text-[#ff6633]' : ''}>
                        Замовлення
                    </span>
                </li>
                {!isManagerOrAdmin && (
                    <li className="relative flex-col items-center gap-2  w-11 cursor-pointer">
                        <Link
                            href="/cart"
                            className="flex flex-col items-center gap-2 w-11 cursor-pointer"
                        >
                            {' '}
                            <IconCart isActive={isCartPage} />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 right-0 bg-[#ff6633] text-white text-[9px] rounded w-4 h-4 flex items-center justify-center py-0.5 px-1">
                                    {' '}
                                    {totalItems > 99 ? '99+' : totalItems}
                                   
                                </span>
                            )}
                            <span className={isCartPage ? "text-[#ff6633]" : "text-main-text"}>
                               Кошик
                            </span>
                        </Link>
                    </li>
                )}
            </ul>
        </>
    );
};

export default TopMenu;

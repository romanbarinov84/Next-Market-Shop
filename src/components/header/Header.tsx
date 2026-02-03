'use client';

import HeaderUserBlock from './UserBlock';
import LogoBlock from './LogoBlock';
import SearchBlock from './SearchBlock';
import { useState } from 'react';
import Link from 'next/link';
import { Category } from '@/src/types/categories';
import GlobalLoader from '../loading/GlobalLoader';

function Header() {
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = async () => {
        if (categories.length > 0) return;

        try {
            const response = await fetch('/api/catalog/');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Ошибка загрузки категории', error);
        } finally {
            setIsLoading(false);
        }
    };

    const openMenu = () => {
        setIsCatalogOpen(true);
        fetchCategories();
    };

    return (
        <header className="w-full bg-white md:shadow-(--shadow-default) items-center flex flex-col md:flex-row md:gap-y-5 xl:gap-y-7 md:gap-10 md:p-2 justify-center relative z-90">
            <div
                className="flex flex-row gap-4 xl:gap-10 py-2 px-4 items-center shadow-md md:shadow-none"
                onClick={() => setIsCatalogOpen(false)}
            >
                <div onMouseEnter={() => setIsCatalogOpen(false)}>
                    <LogoBlock />
                </div>

                <div className="flex items-center" onMouseEnter={openMenu}>
                    <SearchBlock />
                </div>
            </div>

            {isCatalogOpen && (
                <div className="hidden  md:block absolute top-full left-0 w-full bg-white shadow-(--shadow-catalog-menu) z-50">
                    <button className="absolute top-3 right-4 text-red-400 hover:text-blue-200" onClick={() => setIsCatalogOpen(false)}>
                        X
                    </button>
                    <div className="mx-auto px-4 py-3">
                        {isLoading && <GlobalLoader />}
                        <div className="grid grid-cols-2 xl:grid-cols-4 gap-8">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/category/${category.id}`}
                                    className="block px-4 py-2 text-[#414141] hover:text-[#ff6633] font-bold duration-300"
                                    onClick={() => setIsCatalogOpen(false)}
                                >
                                    {category.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <nav
                aria-label="Загальне меню"
                onMouseEnter={() => setIsCatalogOpen(false)}
            >
                <HeaderUserBlock />
            </nav>
        </header>
    );
}

export default Header;

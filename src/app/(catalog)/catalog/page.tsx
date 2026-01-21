'use client';

import { CatalogProps } from '@/src/types/catalog';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CatalogPage = () => {
    const [categories, setCategories] = useState<CatalogProps[]>([]);
    const [err, setErr] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCategories = async () => {
        try {
            const response = await fetch('api/catalog');
            if (!response.ok) {
                throw new Error(`Ошибка сервера : ${response.status}`);
            }
            const data: CatalogProps[] = await response.json();

            setCategories(data.sort((a, b) => a.order - b.order));
        } catch (error) {
            console.error(`Неудалось получить категории:`, error);
            setErr('Неудалось загрузить категории');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    if (isLoading) {
        return <div className="text-center py-8">Загрузка каталога...</div>;
    }

    if (err) {
        return (
            <div className="text-center py-8 text-red-400">
                Ошибка загрузки каталога {err}
            </div>
        );
    }

    if (!categories.length) {
        return (
            <div className="text-center text-orange-600">
                Категорий каталога не найденно
            </div>
        );
    }
    return (
        <section className="w-full flex flex-col mx-w-[1200px] justify-center px-4 py-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 xl:mb-10 flex flex-row xl:text-15">
                Каталог
            </h1>
            <div className='w-full  bg-white/70 backdrop-blur-md rounded-2xl shadow-lg shadow-black/10 p-4 md:p-6 xl:p-8'>
             <div
                className="grid grid-cols-2  md:grid-cols-3 xl:grid-cols-4 gap-4 
            md:gap-6 xl:gap-8"
            >
                {categories.map((category) => (
                    <div
                        key={category._id}
                        className={`${category.mobileColSpan} ${category.tabletColSpan} ${category.colSpan} bg-gray-200 rounded overflow-hidden min-h-50 h-full`}
                    >
                        <div className="h-full w-full">
                            <Link
                                href={`category-${category.id}`}
                                className="block h-full mb-2 relative overflow-hidden rounded-lg shadow-md group hover:shadow-xl transition-shadow duration-300"
                            >
                               
                               
                                
                                <div className="relative w-full h-48 md:h-56 lg:h-64">
                                    <Image
                                        src={category.img}
                                        alt={category.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-103"
                                    />
                                     <div className='
                                      absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-t from-orange-800/20 via-yellow-500/20 to-transparent
                                      '></div>
                                     <div className='absolute left-2.5 bottom-2.5 flex items-center'>
                                     <span className='text-[#fefefe] text-lg font-bold'>{category.title}</span>
                                </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            </div>
           
        </section>
    );
};

export default CatalogPage;

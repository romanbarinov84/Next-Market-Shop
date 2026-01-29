'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import GlobalLoader from '../loading/GlobalLoader';

const InputBlock = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [groupedProducts, setGroupedProducts] = useState([]);

    useEffect(() => {
        const fetchSearchData = async () => {
            if (query.length > 1) {
                try {
                    setIsLoading(true);
                    const response = await fetch(`api/search?query=${query}`);
                    const data = await response.json();
                    setGroupedProducts(data);
                } catch (error) {
                    console.error('Ненайден продукт или категория', error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setGroupedProducts([]);
            }
        };
        const debounceTimer = setTimeout(fetchSearchData, 300);
        return () => clearTimeout(debounceTimer);
    }, [query]);

    const handleInputFocus = () => {
        setIsOpen(!isOpen);
    };

    const resetSearch = () => {
        setIsOpen(false);
        setQuery("")
    }
    return (
        <div className=" relative w-80">
            <div className="relative  rounded-sm border-2 border-(--color-primary) shadow-(--shadow-button-default) leading-2.5">
                <input
                    type="text"
                    placeholder="Знайти товар"
                    className="w-full h-10 py-2 px-4  outline-none  text-[#8f8f8f] text-base"
                    onClick={resetSearch}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <Image
                    className="absolute top-2 right-2 "
                    src="/лого хедера/searchBtn-headerInput.svg"
                    alt="Searching-Пошук"
                    width={24}
                    height={24}
                    onClick={resetSearch}
                />
                {isOpen && (
                    <div className="absolute top-full left-0 w-full mt-1 max-h-63 overflow-y-auto bg-white -border-4 border-gray-300 border-t-0 rounded-b-sm  shadow-lg z-10">
                        {isLoading ? (
                            <GlobalLoader />
                        ) : groupedProducts.length > 0 ? (
                            <div className="p-2 flex flex-col gap-2.5">
                                <div className="flex flex-col gap-2.5 mt-0.5">
                                    <Link
                                        href="#"
                                        className="flex items-center justify-between p-2 gap-x-2 hover:bg-gray-100 rounded wrap-break-word cursor-pointer"
                                        onClick={handleInputFocus}
                                    >
                                        <span className="text-gray-700 font-medium wrap-break-word cursor-pointer">
                                            Категорія
                                        </span>
                                        <div className="relative w-6 h-6">
                                            <Image
                                                src="/icon-burger.png"
                                                alt="категорія"
                                                fill
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </div>
                                    </Link>

                                    <ul className="flex flex-col ">
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                            <Link
                                                href="#"
                                                className="flex items-start gap-x-4 wrap-break-word cursor-pointer"
                                                onClick={handleInputFocus}
                                            >
                                                Товар 1
                                            </Link>
                                        </li>
                                    </ul>
                                    <div>Товари по запиту...</div>
                                </div>
                            </div>
                        ) : query.length > 1 ? (<div className='text-[#8f8f8f] py-2 px-4 wrap-break-word'>Нічого не знайденно</div>) : (<div className='text-[#f6345] py-2 px-4 wrap-break-word'>Введіть більше 2 символів</div>)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputBlock;

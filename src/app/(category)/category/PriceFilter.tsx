'use client';

import { CONFIG } from '@/config/config';
import { PriceFilterProps, PriceRange } from '@/src/types/priceTypes';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';


const PriceFilter = ({ basePath, category }: PriceFilterProps) => {
    const searchParams = useSearchParams();
    const urlPriceFrom = searchParams.get('priceFrom') || '';
    const urlPriceTo = searchParams.get('priceTo') || '';
    const [inputValues, setInputValues] = useState({
        from: urlPriceFrom,
        to: urlPriceTo,
    });
    const [priceRange , setPriceRange] = useState<PriceRange>(CONFIG.FALLBACK_PRICE_RANGE)

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setInputValues((prev) => ({ ...prev, [name]: value }));
        },
        [],
    );

    return (
        <div className="flex flex-col gapy-10 text-[#414141] mt-10 xl:mt-0">
            <div className="flex flex-row justify-between items-center">
                <p className="text-black text-base">Ціна</p>
                <button className="text-xs rounded bg-[#f3f2f1] h-8 p-2 cursor-pointer">
                    Видалити
                </button>
            </div>

            <div className="flex flex-row mt-2 items-center justify-between  gap-2 ">
                <input
                    type="number"
                    name="from"
                    onChange={handleInputChange}
                    min={priceRange.min}
                    max={priceRange.max}
                    value={inputValues.from}
                    className="w-30 px-2 py-1 bg-[#fefefe] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Від"
                />
                <span className="text-gray-500 font-bold text-xl">-</span>
                <input
                    type="number"
                    name="to"
                    onChange={handleInputChange}
                    min={priceRange.min}
                    max={priceRange.max}
                    value={inputValues.to}
                    className="w-30 px-2 py-1 bg-[#fefefe] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="До"
                />
            </div>
        </div>
    );
};

export default PriceFilter;

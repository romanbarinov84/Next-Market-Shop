'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

interface PriceFilterProps {
    basePath: string;
    category: string;
}

const PriceFilter = ({ basePath, category }: PriceFilterProps) => {
    const searchParams = useSearchParams();
    const urlPriceFrom = searchParams.get('priceFrom') || '';
    const urlPriceTo = searchParams.get('priceTo') || '';
    const [inputValues, setInputValues] = useState({
        from: urlPriceFrom,
        to: urlPriceTo,
    });

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
                    className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Від"
                />
                <input
                    type="number"
                    name="to"
                    onChange={handleInputChange}
                    className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="До"
                />
            </div>
        </div>
    );
};

export default PriceFilter;

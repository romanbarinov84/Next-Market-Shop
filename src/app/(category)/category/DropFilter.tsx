'use client';

import { useState } from 'react';
import FilterButtons from './FilterButtons';
import FilterControls from './FilterControls';
import PriceFilter from './PriceFilter';

const DropFilter = ({
    basePath,
    category,
}: {
    basePath: string;
    category: string;
}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    return (
        <div>
            <button
                onClick={() => setIsFilterOpen(true)}
                className="ml-3 mb-3 xl:hidden w-32 h-8 p-2 rounded text-xs justify-center items-center duration-300 gap-x-2 bg-(--color-primary) text-white hover:shadow-(--shadow-button-default) active:shadow-(--shadow-button-active) cursor-pointer"
            >
                Фільтр
            </button>

            <div
                className={`xl:hidden flex flex-col gap-y-10 fixed top-0 left-0 h-screen w-full max-w-90 bg-white z-100 p-4 overflow-y-auto shadow-(--shadow-button-active) text-[#414141] transform origin-left transition-all duration-300 ease-in-out ${
                    isFilterOpen
                        ? 'opacity-100 scale-x-100'
                        : 'opacity-0 scale-x-0'
                }`}
            >
                <div className="flex justify-between items-center mb-4 p-2 bg-gray-200 shadow-(--shadow-button-default) h-11 rounded text-base font-bold">
                    <h3 className="flex justify-start items-center">Фільтр</h3>
                    <button
                        onClick={() => setIsFilterOpen(false)}
                        className="text-red-400 text-xs"
                    >
                        Закрити
                    </button>
                </div>
                 <FilterButtons basePath={basePath}/>
            <FilterControls basePath={basePath}/>
            <PriceFilter basePath={basePath} category={category} setIsFilterOpenAction={setIsFilterOpen}/>
            </div>
           
        </div>
    );
};

export default DropFilter;

'use client';

import Link from 'next/link';

const FilterButtons = () => {
    const FILTERS = [
        { key: 'our-production', label: 'Власне виробництво' },
        { key: 'healthy-food', label: 'корисне харчування' },
        { key: 'non-gmo', label: 'Без ГМО' },
    ];
    return (
        <div className="flex flex-wrap gap-4 mb-6 items-center">
            {FILTERS.map((filter) => (
                <Link 
                key={filter.key} 
                href="#" 
                className={`h-8 p-2 text-xs flex justify-center items-center duration-300 cursor-pointer bg-[#f3f2f1] text-[#060606] hover:shadow-(--shadow-button-secondary) active:shadow-(--shadow-button-active)`}>
                    {filter.label}
                </Link>
            ))}
        </div>
    );
};

export default FilterButtons;

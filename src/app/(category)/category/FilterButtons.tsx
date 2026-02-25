'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const FILTERS = [
    { key: 'our-production', label: 'Власне виробництво' },
    { key: 'healthy-food', label: 'корисне харчування' },
    { key: 'non-gmo', label: 'Без ГМО' },
];

const FilterButtons = ({ basePath }: { basePath: string }) => {
    const searchParams = useSearchParams();
    const currentFilters = searchParams.getAll('filter');

    const buildFilterLink = (filterKey: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (currentFilters.includes(filterKey)) {
            params.delete('filter');
            currentFilters
                .filter((f) => f !== filterKey)
                .forEach((f) => params.append('filter', f));
        } else {
            params.append('filter', filterKey);
        }

        params.delete('page');

        return `${basePath}?${params.toString()}`;
    };

    const isFilterActive = (filterKey: string) =>
        currentFilters.includes(filterKey);

    return (
        <>
            {FILTERS.map((filter) => (
                <Link
                    key={filter.key}
                    href={buildFilterLink(filter.key)}
                    className={`h-8 p-2 text-xs flex justify-center items-center duration-300 cursor-pointer  ${isFilterActive(filter.key) ? 'bg-(--color-primary) text-white hover:shadow-(--shadow-button-default) active:shadow-(--shadow-button-active)' : 'bg-[#f3f2f1] text-[#060606] hover:shadow-(--shadow-button-secondary) active:shadow-(--shadow-button-active)'} `}
                >
                    {filter.label}
                </Link>
            ))}
        </>
    );
};

export default FilterButtons;

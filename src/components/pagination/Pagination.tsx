'use client';

import { PaginationProps } from '@/src/types/paginationProps';
import Link from 'next/link';

const Pagination = ({
    totalItems,
    currentPage,
    basePath,
    itemsPerPage,
    searchQuery,
}: PaginationProps) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const params = new URLSearchParams(searchQuery);

    const createPageUrl = (page: number) => {
        const newParams = new URLSearchParams(params);
        newParams.set('page', page.toString());
        return `${basePath}?${newParams.toString()}`;
    };

    const buttonBase = ` w-full sm:w-auto px-4 py-3 sm:py-2 rounded-xl text-center font-medium
                         transition  select-none`;

    const buttonActive = `  border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400`;

    const buttonDisabled = ` border border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50`;

    return (
        <div className="    flex flex-col gap-3 mt-8 mb-5 sm:flex-row sm:justify-center sm:gap-4  ">
            <Link
                href={createPageUrl(currentPage - 1)}
                onClick={(e) => {
                    if (currentPage === 1) e.preventDefault();
                }}
                className= {`${buttonBase} ${currentPage === 1 ? buttonDisabled : buttonActive}`}
            >
                ← Попередня
            </Link>

            <Link
                href={createPageUrl(currentPage + 1)}
                onClick={(e) => {
                    if (currentPage === totalPages) e.preventDefault();
                }}
                className= {`${buttonBase} ${currentPage === totalPages ? buttonDisabled : buttonActive}`}
            >
                Наступна →
            </Link>
        </div>
    );
};

export default Pagination;

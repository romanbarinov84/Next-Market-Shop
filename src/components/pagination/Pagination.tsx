'use client';

import { PaginationProps } from '@/src/types/paginationProps';
import Link from 'next/link';

const getVisiblePages = (totalPages: number, currentPage: number) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, currentPage + 2);

  if (currentPage <= 3) end = 5;
  else if (currentPage >= totalPages - 2) start = totalPages - 4;

  const pages: (number | string)[] = [];

  if (start > 1) pages.push(1);
  if (start > 2) pages.push('...');

  for (let i = start; i <= end; i++) pages.push(i);

  if (end < totalPages - 1) pages.push('...');
  if (end < totalPages) pages.push(totalPages);

  return pages;
};

const Pagination = ({
  totalItems,
  currentPage,
  basePath,
  itemsPerPage,
  searchQuery,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const params = new URLSearchParams(searchQuery);
  const visiblePages = getVisiblePages(totalPages, currentPage);

  const createPageUrl = (page: number) => {
    const newParams = new URLSearchParams(params);
    newParams.set('page', page.toString());
    return `${basePath}?${newParams.toString()}`;
  };

  const buttonBase = `
    w-full sm:w-auto
    px-4 py-3 sm:py-2
    rounded-xl
    text-center font-medium
    transition
    select-none
  `;

  const buttonActive = `
    border border-gray-300
    text-gray-700
    hover:bg-gray-100 hover:border-gray-400
  `;

  const buttonDisabled = `
    border border-gray-200
    text-gray-400
    cursor-not-allowed
    bg-gray-50
  `;

  const buttonCurrent = `
    bg-black text-white
    border border-black
    cursor-default
  `;

  return (
    <div className="flex flex-col gap-3 mt-8 mb-5 sm:flex-row sm:justify-center sm:gap-4 flex-wrap">
      {/* Prev */}
      <Link
        href={createPageUrl(currentPage - 1)}
        onClick={(e) => currentPage === 1 && e.preventDefault()}
        className={`${buttonBase} ${
          currentPage === 1 ? buttonDisabled : buttonActive
        }`}
      >
        ← Попередня
      </Link>

      {/* Pages */}
      {visiblePages.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`dots-${index}`}
              className="px-2 py-3 text-gray-400"
            >
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isCurrent = pageNumber === currentPage;

        return (
          <Link
            key={pageNumber}
            href={createPageUrl(pageNumber)}
            className={`${buttonBase} ${
              isCurrent ? buttonCurrent : buttonActive
            }`}
            onClick={(e) => isCurrent && e.preventDefault()}
          >
            {pageNumber}
          </Link>
        );
      })}

      {/* Next */}
      <Link
        href={createPageUrl(currentPage + 1)}
        onClick={(e) => currentPage === totalPages && e.preventDefault()}
        className={`${buttonBase} ${
          currentPage === totalPages ? buttonDisabled : buttonActive
        }`}
      >
        Наступна →
      </Link>
    </div>
  );
};

export default Pagination;

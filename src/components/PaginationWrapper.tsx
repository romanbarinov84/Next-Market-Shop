'use client';

import { CONFIG } from '@/config/config';
import { debounce } from '@/UTILS/debounce';
import { useSearchParams, useRouter  } from 'next/navigation';
import { useEffect, useState } from 'react';
import Pagination from './pagination/Pagination';

function getItemsPerPageByWith() {
    const width = window.innerWidth;
    if (width < 768) return 2;
    if (width < 1280) return 3;
    return 4;
}

const PaginationWrapper = ({
    totalItems,
    currentPage,
    basePath,
}: {
    totalItems: number;
    currentPage: number;
    basePath: string;
}) => {
    const [itemsPerPage, setItemsPerPage] = useState(CONFIG.ITEMS_PER_PAGE);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const updateItemsPerPage = () => {
            const newItemsPerPage = getItemsPerPageByWith();
            if (newItemsPerPage === itemsPerPage) return;

            setItemsPerPage(newItemsPerPage);

            const params = new URLSearchParams(searchParams.toString());
            params.set('itemsPerPage', newItemsPerPage.toString());
            params.set("page" , "1");

            router.replace(`${basePath}?${params.toString()}`,{scroll:false});

        };

        updateItemsPerPage();

        const handleResize = () => {
            debounce(updateItemsPerPage, 200)
        }

        window.addEventListener("resize" , handleResize);

        return () => window.removeEventListener("resize" , handleResize)
    },[itemsPerPage,basePath,searchParams,router]);

    return <div>
        <Pagination 
        totalItems={totalItems}
        currentPage={currentPage}
        basePath={basePath}
        itemsPerPage={itemsPerPage}
        searchQuery={searchParams.toString()}
        />
    </div>;
};

export default PaginationWrapper;

import { Suspense } from 'react';
import fetchProductsByTag from '../fetchProducts';
import GenericProductListPage from '../GenerictListPage';
import type { Metadata } from 'next';
import GlobalLoader from '@/src/components/loading/GlobalLoader';

export const metadata: Metadata = {
    title: 'Акції магазина "Балувана Галя"',
    description: 'Акційні товари магазина "Балувана Галя"',
};

const AllActions = async ({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
}) => {
    return (
        <Suspense fallback={<GlobalLoader/>}>

              <GenericProductListPage
            searchParams={searchParams}
            props={{
                fetchData: ({pagination:{startIdx , perPage}}) => fetchProductsByTag('actions' , {pagination:{startIdx , perPage}}),
                pageTitle: 'Усі акції',
                basePath: '/actions',
                
            }}
        />
        </Suspense>
      
    );
};

export default AllActions;

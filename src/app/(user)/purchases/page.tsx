


import { Suspense } from 'react';
import GenericListPage from '../../(products)/GenerictListPage';
import fetchPurchases from '../fetchPurchases';
import GlobalLoader from '@/src/components/loading/GlobalLoader';

const AllPurchases = async ({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
}) => {
    return (
        <Suspense fallback={<GlobalLoader/>}>

             <GenericListPage
            searchParams={searchParams}
           props={{
                fetchData:({pagination:{startIdx , perPage}}) => fetchPurchases({
                    pagination:{startIdx , perPage}
                }),
                pageTitle: 'Усі покупки',
                basePath: '/purchases',
                errorMessage: 'Помилка невдалося завантажити покупки',
            }}
        />
        </Suspense>
       
    );
};
export default AllPurchases;

import { Suspense } from 'react';
import fetchProductsByTag from '../fetchProducts';
import GenericProductListPage from '../GenerictListPage';
import GlobalLoader from '@/src/components/loading/GlobalLoader';

export const metaData = {
    title: 'Новинки магазина "Балувана Галя"',
    description: 'Нові товари магазина "Балувана Галя"',
};

const AllNew = async ({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
}) => {
    return (
        <Suspense fallback={<GlobalLoader/>}>

             <GenericProductListPage
            searchParams={searchParams}
            props={{
                fetchData:({pagination:{startIdx , perPage}}) => fetchProductsByTag("new" , {
                    pagination:{startIdx , perPage}
                }),
                pageTitle: 'Усі новинки',
                basePath: '/new',
                errorMessage: 'Помилка невдалося завантажити новинки',
            }}
        />
        </Suspense>
       
    );
};

export default AllNew;

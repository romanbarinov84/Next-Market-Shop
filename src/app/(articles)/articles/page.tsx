import { Suspense } from 'react';
import GenericProductListPage from '../../(products)/GenerictListPage';
import fetchArticles from '../fetchArticles';
import GlobalLoader from '@/src/components/loading/GlobalLoader';

export const metadata = {
    title: 'Пости магазина "Балувана Галя"',
    description: 'Пости на сайті магазина "Балувана Галя"',
};

const AllArticles = async ({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
}) => {
    return (
        <Suspense fallback={<GlobalLoader/>}>

            <GenericProductListPage
            searchParams={searchParams}
            props={{
                fetchData:({pagination:{startIdx , perPage}}) => fetchArticles({
                    pagination:{startIdx , perPage}
                    }),
                pageTitle: 'Усі пости',
                basePath: '/articles',
                errorMessage: 'Помилка невдалося завантажити пости',
                contentType:"articles"
            }}
        />
        </Suspense>
        
    );
};
export default AllArticles;

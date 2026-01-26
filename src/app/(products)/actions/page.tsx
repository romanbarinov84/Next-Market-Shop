import fetchProductsByCategory from '../fetchProducts';
import GenericProductListPage from '../GenerictListPage';
import type { Metadata } from 'next';

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
        <GenericProductListPage
            searchParams={searchParams}
            props={{
                fetchData: ({pagination:{startIdx , perPage}}) => fetchProductsByCategory('actions' , {pagination:{startIdx , perPage}}),
                pageTitle: 'Усі акції',
                basePath: '/actions',
                errorMessage: 'Помилка невдалося завантажити акції',
            }}
        />
    );
};

export default AllActions;

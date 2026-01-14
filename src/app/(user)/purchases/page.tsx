


import GenericListPage from '../../(products)/GenerictListPage';
import fetchPurchases from '../fetchPurchases';

const AllPurchases = async ({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
}) => {
    return (
        <GenericListPage
            searchParams={searchParams}
            props={{
                fetchData: () => fetchPurchases(),
                pageTitle: 'Усі покупки',
                basePath: '/purchases',
                errorMessage: 'Помилка невдалося завантажити покупки',
            }}
        />
    );
};
export default AllPurchases;

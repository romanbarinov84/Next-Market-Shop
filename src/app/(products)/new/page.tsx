import fetchProductsByCategory from '../fetchProducts';
import GenericProductListPage from '../GenerictListPage';

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
        <GenericProductListPage
            searchParams={searchParams}
            props={{
                fetchData:({pagination:{startIdx , perPage}}) => fetchProductsByCategory("new" , {
                    pagination:{startIdx , perPage}
                }),
                pageTitle: 'Усі новинки',
                basePath: '/new',
                errorMessage: 'Помилка невдалося завантажити новинки',
            }}
        />
    );
};

export default AllNew;

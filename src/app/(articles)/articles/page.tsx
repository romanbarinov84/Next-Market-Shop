import GenericProductListPage from '../../(products)/GenerictListPage';
import fetchArticles from '../fetchArticles';

export const metaData = {
    title: 'Пости магазина "Балувана Галя"',
    description: 'Пости на сайті магазина "Балувана Галя"',
};

const AllArticles = async ({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
}) => {
    return (
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
    );
};
export default AllArticles;

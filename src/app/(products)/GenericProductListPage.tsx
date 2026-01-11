import { GenericListPageProps } from '@/src/types/GenericProductListPage';
import ProductsSection from './ProductsSection';
import { CONFIG } from '@/config/config';

const GenericProductListPage = async ({
    searchParams,
    props,
}: {
    searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
    props: GenericListPageProps;
}) => {
    const params = await searchParams;
    const page = params?.page;
    const itemsPerPage = params?.itemsPerPage || CONFIG.ITEMS_PER_PAGE;
    const currentPage = Number(page) || 1;
    const perPage = Number(itemsPerPage);
    const startIdx = (currentPage - 1) * perPage;

    let products = [];

    try {
        products = await props.fetchData();
    } catch {
        return <div>{props.errorMessage}</div>;
    }

    const paginatedProducts = products.slice(startIdx, startIdx + perPage);

    return (
        <div>
            <ProductsSection
                title={props.pageTitle}
                viewAllButton={{ text: 'На головну', href: '/' }}
                products={paginatedProducts}
            />
        </div>
    );
};

export default GenericProductListPage;

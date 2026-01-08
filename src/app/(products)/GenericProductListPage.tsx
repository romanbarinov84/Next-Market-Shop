
import { GenericListPageProps } from '@/src/types/GenericProductListPage';
import ProductsSection from './ProductsSection';

const GenericProductListPage = async ({
    searchParams,
    props,
}: {
    searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
    props: GenericListPageProps;
}) => {
    const products = await props.fetchData();

    return (
        <div>
            <ProductsSection
                title={props.pageTitle}
                viewAllButton={{ text: 'На головну', href: '/migrations' }}
                products={products}
            />
        </div>
    );
};

export default GenericProductListPage;

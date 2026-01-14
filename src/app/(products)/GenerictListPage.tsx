import { GenericListPageProps } from '@/src/types/GenerictListPage';
import ProductsSection from './ProductsSection';
import { CONFIG } from '@/config/config';
import PaginationWrapper from '@/src/components/PaginationWrapper';
import ArticlesSection from '../(articles)/ArticlesSection';
import { ProductCardProps } from '@/src/types/product';
import { ArticlesCardProps } from '@/src/types/ArticlesListPageProps';




const GenericListPage = async ({
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

    let items = [];

    try {
        items = await props.fetchData();
    } catch {
        return <div className='text-red-500'>{props.errorMessage}</div>;
    }

    const paginatedItems = items.slice(startIdx, startIdx + perPage);

    return (
        <div>
            {!props.contentType ? (
                 <ProductsSection
                title={props.pageTitle}
                viewAllButton={{ text: 'На головну', href: '/' }}
                products={paginatedItems as ProductCardProps[]}
            />
            ) :(
                 <ArticlesSection
                title={props.pageTitle}
                viewAllButton={{ text: 'На головну', href: '/' }}
                articles={paginatedItems as ArticlesCardProps[]}
            />
            )}
           
           

            {items.length > perPage && <PaginationWrapper totalItems={items.length} 
             currentPage={currentPage}
             basePath={props.basePath}
             contentType={props.contentType}
             />}
        </div>
    );
};

export default GenericListPage;

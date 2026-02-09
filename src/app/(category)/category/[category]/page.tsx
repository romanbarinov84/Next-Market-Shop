import GenericListPage from '@/src/app/(products)/GenerictListPage';
import GlobalLoader from '@/src/components/loading/GlobalLoader';
import { PATH_TRANSLATIONS } from '@/UTILS/pathTranslations';
import { Suspense } from 'react';
import fetchProductByCategory from '../fetchCategory.tsx/fetchProductByCategory';
import FilterButtons from '../FilterButtons';
import Link from 'next/link';
import FilterControls from './FilterControls';

export async function generateMetaData({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;

    return {
        title: PATH_TRANSLATIONS[category] || category,
        description: `Описание категории товаров ${PATH_TRANSLATIONS[category] || category}`,
    };
}

const CategoryPage = async ({
    searchParams,
    params,
}: {
    searchParams: Promise<{
        page?: string;
        itemsPerPage?: string;
        filter?: string | string[];
    }>;
    params: Promise<{ category: string }>;
}) => {
    const { category } = await params;
    const resolvedSearchParams = await searchParams;
    const activeFilter = resolvedSearchParams.filter;

    return (
        <div className="px-4 sm:px-6 lg:px-8 xl:px-[max(12px,calc((100%-1208px)/2))] ">
            <h1 className="text-2xl xl:text-4xl text-left font-bold text-[#414141] mb-6">
                {PATH_TRANSLATIONS[category] || category}
            </h1>
            <FilterButtons basePath={`/category/${category}`} />
           <FilterControls 
           activeFilter={resolvedSearchParams.filter}
           basePath={`/category/${category}`}
           searchParams={{
            page:resolvedSearchParams.page,
            itemsPerPage:resolvedSearchParams.itemsPerPage
           }}
           />
            <Suspense fallback={<GlobalLoader />}>
                <GenericListPage
                    searchParams={Promise.resolve(resolvedSearchParams)}
                    props={{
                        fetchData: ({ pagination: { startIdx, perPage } }) =>
                            fetchProductByCategory(category, {
                                pagination: { startIdx, perPage },
                                filter: activeFilter,
                            }),
                        pageTitle: '',
                        basePath: `/category/${category}`,
                        contentType: 'category',
                        errorMessage: 'Не удалось загрузить товары',
                    }}
                />
            </Suspense>
        </div>
    );
};




export default CategoryPage;

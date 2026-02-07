import fetchProductsByTag from '@/src/app/(products)/fetchProducts';
import GenericListPage from '@/src/app/(products)/GenerictListPage';
import ErrorComponent from '@/src/components/errorComponent/ErrorComponent';
import GlobalLoader from '@/src/components/loading/GlobalLoader';
import { PATH_TRANSLATIONS } from '@/UTILS/pathTranslations';
import { Suspense } from 'react';

const CategoryPage = async ({
    searchParams,
    params,
}: {
    searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
    params: Promise<{ category: string }>;
}) => {
    const { category } = await params;

    return (
        <Suspense fallback={<GlobalLoader />}>
            <GenericListPage
                searchParams={searchParams}
                props={{
                    fetchData: ({ pagination: { startIdx, perPage } }) =>
                        fetchProductsByCategory(category, {
                            pagination: { startIdx, perPage },
                        }),
                    pageTitle: PATH_TRANSLATIONS[category] || category,
                    basePath: `/category/${category}`,
                    contentType:"category",
                }}
            />
        </Suspense>
    );
};

export default CategoryPage;

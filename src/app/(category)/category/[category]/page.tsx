
import GenericListPage from '@/src/app/(products)/GenerictListPage';
import GlobalLoader from '@/src/components/loading/GlobalLoader';
import { PATH_TRANSLATIONS } from '@/UTILS/pathTranslations';
import { Suspense } from 'react';
import fetchProductByCategory from '../fetchCategory.tsx/fetchProductByCategory';

export async function generateMetaData({
  params,
}:{
  params:Promise<{category:string}>
}) {
  const { category} = await params;
   
  return {
    title: PATH_TRANSLATIONS[category] || category,
    description: `Описание категории товаров ${PATH_TRANSLATIONS[category] || category}`
  }
}

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
                        fetchProductByCategory(category, {
                            pagination: { startIdx, perPage },
                        }),
                    pageTitle: PATH_TRANSLATIONS[category] || category,
                    basePath: `/category/${category}`,
                    contentType:"category",
                    errorMessage: "Не удалось загрузить товары",
                }}
            />
        </Suspense>
    );
};

export default CategoryPage;

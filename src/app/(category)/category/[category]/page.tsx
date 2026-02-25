import GenericListPage from '@/src/app/(products)/GenerictListPage';
import GlobalLoader from '@/src/components/loading/GlobalLoader';
import { PATH_TRANSLATIONS } from '@/UTILS/pathTranslations';
import { Suspense } from 'react';
import fetchProductByCategory from '../fetchCategory.tsx/fetchProductByCategory';
import FilterButtons from '../FilterButtons';
import FilterControls from '../FilterControls';
import PriceFilter from '../PriceFilter';
import DropFilter from '../DropFilter';

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
        priceFrom?:string;
        priceTo?:string;
        inStock?:string;
    }>;
    params: Promise<{ category: string }>;
}) => {
    const { category } = await params;
    const resolvedSearchParams = await searchParams;
    const activeFilter = resolvedSearchParams.filter;
    const priceFrom = resolvedSearchParams.priceFrom;
    const priceTo = resolvedSearchParams.priceTo;
    const inStock = resolvedSearchParams.inStock === "true";


    return (
        <div className="px-4 sm:px-6 lg:px-8 xl:px-[max(12px,calc((100%-1208px)/2))] flex flex-col mx-auto">
            <h1 className=" ml-3 xl:ml-0 text-4xl xl:text-6xl text-left font-bold text-[#414141] mb-6 md:mb-8 xl:mb-15 max-w-84 md:max-w-max leading-[150%] ">
                {PATH_TRANSLATIONS[category] || category}
            </h1>
            <DropFilter basePath={`/category/${category}`} category={category}/>
            <div className=" hidden xl:flex flex-wrap gap-4 mb-6 items-center">
                 <FilterButtons basePath={`/category/${category}`}  />
            </div>
           
            <div className="flex flex-row gap-x-10 justify-between">
                <div className="hidden xl:flex flex-col w-70 gap-x-10">
                    <div className="h-11 bg-[#fefefe] rounded text-base font-bold text-[#414141] flex items-center p-2">
                        Фільтр
                    </div>
                    <PriceFilter basePath={`/category/${category}`} category={category}/>
                </div>

                <div className='flex flex-col'>
                    <div className=" hidden xl:flex flex-row flex-wrap gap-y-3 gap-x-6 mb-6">
                        <FilterControls
                    activeFilter={resolvedSearchParams.filter}
                    basePath={`/category/${category}`}
                    
                />
                    </div>
                               
                <Suspense fallback={<GlobalLoader />}>
                    <GenericListPage
                        searchParams={Promise.resolve(resolvedSearchParams)}
                        props={{
                            fetchData: ({
                                pagination: { startIdx, perPage },
                            }) =>
                                fetchProductByCategory(category, {
                                    pagination: { startIdx, perPage },
                                    filter: activeFilter,
                                    priceFrom,
                                    priceTo,
                                    inStock,
                                }),

                            basePath: `/category/${category}`,
                            contentType: 'category',
                            errorMessage: 'Не удалось загрузить товары',
                        }}
                    />
                </Suspense>
                </div>
     
            </div>
        </div>
    );
};

export default CategoryPage;

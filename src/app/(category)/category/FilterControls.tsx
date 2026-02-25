import { FilterControlsProps } from '@/src/types/FilterControls';
import Link from 'next/link';

const FilterControls = ({
    activeFilter,
    basePath,
    searchParams = {},
}: FilterControlsProps) => {
    const minPrice = searchParams.priceFrom;
    const maxPrice = searchParams.priceTo;

    const hasPriceFilter = minPrice || maxPrice;

    const buildClearPriceFilterLink = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('priceFrom');
        params.delete('priceTo');

        return `${basePath}?${params.toString()}`;
    };

    return (
        <>
            <div
                className={`h-8 p-2 text-xs flex justify-center items-center duration-300 cursor-not-allowed gap-x-2 ${
                    !activeFilter || activeFilter.length === 0
                        ? 'bg-[#f3f2f1] text-[#606060]'
                        : 'bg-(--color-primary) text-white'
                }`}
            >
                {(() => {
                    const activeFilterCount = activeFilter
                        ? Array.isArray(activeFilter)
                            ? activeFilter.length
                            : 1
                        : 0;
                    return activeFilterCount === 0
                        ? 'Фільтри'
                        : activeFilterCount === 1
                          ? 'Фільтр 1'
                          : `Фільтри ${activeFilterCount}`;
                })()}
            </div>
            <div
                className={`h-8 p-2 text-xs flex justify-center items-center duration-300 cursor-not-allowed gap-x-2 ${
                    !activeFilter || activeFilter.length === 0
                        ? 'bg-[#f3f2f1] text-[#606060]'
                        : 'bg-(--color-primary) text-white'
                }`}
            >
                <Link href={buildClearPriceFilterLink()}>Очистити фільтри</Link>
                <button className="w-6 h-6 flex items-center justify-center bg-gray-200 text-black rounded hover:bg-gray-300 active:bg-gray-400  duration-200 shadow-sm hover:shadow-md active:shadow-inner">
                    X
                </button>
            </div>
            {hasPriceFilter && (
                <div className="h-8 p-2 rounded text-xs flex justify-center items-center duration-300 gap-x-2 bg-(--color-primary) text-white">
                    <Link
                        href={buildClearPriceFilterLink()}
                        className="flex items-center gap-x-2"
                    >
                        Цена {minPrice !== undefined ? `от ${minPrice}` : ''}{' '}
                        {maxPrice !== undefined ? `до ${maxPrice}` : ''}
                        <button>X</button>
                    </Link>
                </div>
            )}
            <div
                className={`h-8 p-2 text-xs flex justify-center items-center duration-300 cursor-not-allowed gap-x-2`}
            ></div>
        </>
    );
};

export default FilterControls;

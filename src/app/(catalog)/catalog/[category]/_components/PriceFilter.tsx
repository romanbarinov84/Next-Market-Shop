'use client';


import 'rc-slider/assets/index.css';

import { CONFIG } from '@/config/config';
import ErrorComponent from '@/src/components/errorComponent/ErrorComponent';
import GlobalLoader from '@/src/components/loading/GlobalLoader';
import { PriceFilterProps, PriceRange } from '@/src/types/priceTypes';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import PriceFilterHeader from './PriceFilterHeader';
import PriceInputs from './PriceInputs';

import InStockToggle from './InStockToggle';
import PriceRangeSlider from './PriceRangeSlider';

const PriceFilter = ({
    basePath,
    category,
    setIsFilterOpenAction,
}: PriceFilterProps) => {
    const searchParams = useSearchParams();
    const urlPriceFrom = searchParams.get('priceFrom') || '';
    const urlPriceTo = searchParams.get('priceTo') || '';
    const [inputValues, setInputValues] = useState({
        from: urlPriceFrom,
        to: urlPriceTo,
    });
    const urlInStock = searchParams.get('inStock') === 'true';
    const [inStock, setInStock] = useState(urlInStock);

    const [priceRange, setPriceRange] = useState<PriceRange>(
        CONFIG.FALLBACK_PRICE_RANGE,
    );
    const router = useRouter();
    const [error, setError] = useState<{
        error: Error;
        userMessage: string;
    } | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    const fetchPriceData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const currentCategory = category ?? searchParams.get('category');

            if (!currentCategory) return;
            const params = new URLSearchParams();
            params.set('category', currentCategory!);
            params.set('getPriceRangeOnly', 'true');

            const response = await fetch(`/api/category?${params.toString()}`);

            if (!response.ok)
                throw new Error(`Ошибка сервера: ${response.status}`);

            const data = await response.json();
            const receivedRange =
                data.priceRange || CONFIG.FALLBACK_PRICE_RANGE;

            const roundedRange = {
                min: Math.floor(Number(receivedRange.min)),
                max: Math.floor(Number(receivedRange.max)),
            };

            setPriceRange(roundedRange);

            setInputValues({
                from: urlPriceFrom || roundedRange.min.toString(),
                to: urlPriceTo || roundedRange.max.toString(),
            });
        } catch (error) {
            setError({
                error:
                    error instanceof Error
                        ? error
                        : new Error('Неизвестная ошибка'),
                userMessage: 'Не удалось загрузить категорию',
            });
            setPriceRange(CONFIG.FALLBACK_PRICE_RANGE);
            setInputValues({
                from: CONFIG.FALLBACK_PRICE_RANGE.min.toString(),
                to: CONFIG.FALLBACK_PRICE_RANGE.max.toString(),
            });
        } finally {
            setIsLoading(false);
        }
    }, [category, searchParams, urlPriceFrom, urlPriceTo]);

    useEffect(() => {
        fetchPriceData();
    }, [fetchPriceData]);

   

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        applyPriceFilter();
        if (setIsFilterOpenAction) {
            setIsFilterOpenAction(false);
        }
    };



    const applyPriceFilter = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString());

        let fromValue = Math.max(
            priceRange.min,
            parseInt(inputValues.from) || priceRange.min,
        );
        let toValue = Math.min(
            priceRange.max,
            parseInt(inputValues.to) || priceRange.max,
        );

        if (fromValue > toValue) [fromValue, toValue] = [toValue, fromValue];

        params.set('priceFrom', fromValue.toString());
        params.set('priceTo', toValue.toString());
        params.set('inStock', inStock.toString());

        router.push(`${basePath}?${params.toString()}`);
    }, [
        searchParams,
        priceRange.min,
        priceRange.max,
        inputValues.from,
        inputValues.to,
        inStock,
        router,
        basePath,
    ]);

    const sliderValues = [
        parseInt(inputValues.from) || priceRange.min,
        parseInt(inputValues.to) || priceRange.max,
    ];

    const handleSliderChange = useCallback((values:[number , number]) => {
       
            setInputValues({
                from: values[0].toString(),
                to: values[1].toString(),
            });
        
    }, []);

    const resetPriceFilter = useCallback(() => {
        setInputValues({
            from: String(priceRange.min),
            to: String(priceRange.max),
        });

        const params = new URLSearchParams(searchParams.toString());
        params.delete('priceFrom');
        params.delete('priceTo');
        params.delete('page');

        router.push(`${basePath}?${params.toString()}`);
    }, [basePath, priceRange.max, priceRange.min, router, searchParams]);

    if (isLoading) return <GlobalLoader />;

    if (error)
        return (
            <ErrorComponent
                error={error.error}
                userMessage={error.userMessage}
            />
        );

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gapy-10 text-[#414141] mt-10 xl:mt-0"
        >
            <PriceFilterHeader resetPriceFilter={resetPriceFilter} />

            <PriceInputs
                onFromChangeAction={(value: string) =>
                    setInputValues((prev) => ({ ...prev, from: value }))
                }
                onToChangeAction={(value: string) =>
                    setInputValues((prev) => ({ ...prev, to: value }))
                }
                
                from={inputValues.from}
                to={inputValues.to}
                min={priceRange.min}
                max={priceRange.max}
            />
            <div className='m-3'>
                <PriceRangeSlider min={priceRange.min}
                max={priceRange.max} values={sliderValues} onChangeAction={handleSliderChange}/>
            </div>
           
          <InStockToggle checked={inStock} onChangeAction={(checked) => setInStock(checked)} />
            <button
                type="submit"
                className="px-4 py-2 mt-5 bg-[#ff6633] text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            >
                Отримати
            </button>
        </form>
    );
};

export default PriceFilter;

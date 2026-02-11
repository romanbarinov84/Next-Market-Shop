'use client';

import { CONFIG } from '@/config/config';
import ErrorComponent from '@/src/components/errorComponent/ErrorComponent';
import GlobalLoader from '@/src/components/loading/GlobalLoader';
import { PriceFilterProps, PriceRange } from '@/src/types/priceTypes';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useCallback, useEffect, useState } from 'react';

const PriceFilter = ({ basePath, category }: PriceFilterProps) => {
    const searchParams = useSearchParams();
    const urlPriceFrom = searchParams.get('priceFrom') || '';
    const urlPriceTo = searchParams.get('priceTo') || '';
    const [inputValues, setInputValues] = useState({
        from: urlPriceFrom,
        to: urlPriceTo,
    });
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

            setPriceRange({
                min: Math.floor(parseInt(receivedRange.min)),
                max: Math.floor(parseInt(receivedRange.max)),
            });

            setInputValues({
                from: urlPriceFrom || receivedRange.min.toString(),
                to: urlPriceTo || receivedRange.max.toString(),
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

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setInputValues((prev) => ({ ...prev, [name]: value }));
        },
        [],
    );

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        applyPriceFilter();
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

        if (fromValue > toValue) {
            [fromValue, toValue] = [toValue, fromValue];
        }

        params.set('priceFrom', fromValue.toString());
        params.set('priceTo', toValue.toString());

        router.push(`${basePath}?${params.toString()}`);
    }, [inputValues, priceRange, searchParams, router, basePath]);

    const resetPriceFilter = () => {
        setInputValues({
            from: String(priceRange.min),
            to: String(priceRange.max),
        });

        const params = new URLSearchParams(searchParams.toString());
        params.delete('priceFrom');
        params.delete('priceTo');
        params.delete('page');

        router.push(`${basePath}?${params.toString()}`);
    };

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
            <div className="flex flex-row justify-between items-center">
                <p className="text-black text-base">Ціна</p>
                <button
                    type="button"
                    onClick={resetPriceFilter}
                    className="text-xs rounded bg-[#f3f2f1] h-8 p-2 cursor-pointer"
                >
                    Видалити
                </button>
            </div>

            <div className="flex flex-row mt-2 items-center justify-between  gap-2 ">
                <input
                    type="number"
                    name="from"
                    onChange={handleInputChange}
                    min={priceRange.min}
                    max={priceRange.max}
                    value={inputValues.from}
                    className="w-30 px-2 py-1 bg-[#fefefe] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={`Від ${priceRange.min}`}
                />
                <span className="text-gray-500 font-bold text-xl">-</span>
                <input
                    type="number"
                    name="to"
                    onChange={handleInputChange}
                    min={priceRange.min}
                    max={priceRange.max}
                    value={inputValues.to}
                    className="w-30 px-2 py-1 bg-[#fefefe] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={`До ${priceRange.max}`}
                />
            </div>
            <button
                type="submit"
                className="px-4 py-2 mt-5 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            >
                Отримати
            </button>
        </form>
    );
};

export default PriceFilter;

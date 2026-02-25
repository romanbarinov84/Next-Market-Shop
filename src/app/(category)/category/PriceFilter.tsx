'use client';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

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
    const urlInStock = searchParams.get("inStock") === "true";
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
                }

            setPriceRange(
               roundedRange
            );

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

     const handleInStockChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInStock(e.target.checked);
    },
    []
  );

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

        if (fromValue > toValue)  [fromValue, toValue] = [toValue, fromValue];
           
        

        params.set('priceFrom', fromValue.toString());
        params.set('priceTo', toValue.toString());
        params.set("inStock", inStock.toString());

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

    const handleSliderChange = useCallback((values: number | number[]) => {
        if (Array.isArray(values)) {
            setInputValues({
                from: values[0].toString(),
                to: values[1].toString(),
            });
        }
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
            <div className="w-[320px] xl:w-68 px-2 mx-auto mt-4">
                <Slider
                    range
                    min={priceRange.min}
                    max={priceRange.max}
                    value={sliderValues}
                    onChange={handleSliderChange}
                    styles={{
                        track: {
                            backgroundColor: '#70c05b',
                            height: 6,
                        },
                        rail: {
                            backgroundColor: '#e5e5e5',
                            height: 6,
                        },
                        handle: {
                            width: 20,
                            height: 20,
                            border: '1px solid #fffff',
                            borderColor: '#118845e',
                            backgroundColor: '#70c05b',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            marginTop: '-5',
                            cursor: 'pointer',
                            opacity: '1',
                        },
                    }}
                />
            </div>
             <div className="flex items-center gap-2 mt-5">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="inStock"
            checked={inStock}
            onChange={handleInStockChange}
            className="sr-only peer"
          />
          <div className="w-11.5 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#70c05b] transition-colors duration-200">
            <div
              className={`
                absolute top-0.5 left-0
                w-5 h-5
                border-[0.5px] border-[rgba(0,0,0,0.04)]
                rounded-full
                shadow-[0px_1px_1px_rgba(0,0,0,0.08),0px_2px_6px_rgba(0,0,0,0.15)]
                bg-white
                transition-transform duration-300
                ${
                  inStock
                    ? "transform translate-x-6"
                    : "transform translate-x-0"
                }
              `}
            ></div>
          </div>
          <span className="ml-2 text-sm text-[#414141]">В наявності</span>
        </label>
      </div>
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

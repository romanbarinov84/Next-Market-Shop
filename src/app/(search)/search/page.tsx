'use client';

import GlobalLoader from '@/src/components/loading/GlobalLoader';
import { ProductCardProps } from '@/src/types/product';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductsSection from '../../(products)/ProductsSection';

const SearchResult = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [err, setErr] = useState<{error:Error , userMessage:string } | null>(null);
    const [products, setProducts] = useState<ProductCardProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!query) return;

        const fetchSearchResults = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `/api/search-full?query=${encodeURIComponent(query)}`,
                );
                if (!response.ok) throw new Error('Ошибка сети');
                const data: ProductCardProps[] = await response.json();
                setProducts(data);
            } catch (error) {
                 setErr({
                error:error instanceof Error ? error  : new Error("Неизвестная ошибка"),
                userMessage:"Неудалось загрузить результаты поиска",
            });
            } finally {
                setIsLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    if (isLoading) return <GlobalLoader />;

    return (
        <div className="px-4 sm:px-6 lg:px-8 xl:px-[max(12px,calc((100%-1208px)/2))] text-#414141">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6">
                Результати пошуку: <span className="text-primary">{query}</span>
            </h1>

            {products.length === 0 ? (
                <p className="text-gray-500 text-center mt-12 text-lg sm:text-xl">
                    Ничего не найдено
                </p>
            ) : (
               
                    <ProductsSection
                        title="Рекомендовані товари"
                        products={products}
                        viewAllButton={{
                            text: 'Показати всі',
                            href: '/catalog',
                        }}
                    />
                
            )}
        </div>
    );
};

export default SearchResult;

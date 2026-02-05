'use client';


import { useEffect, useRef, useState } from 'react';
import { SearchProduct } from '@/src/types/searchProduct';
import { useRouter } from 'next/navigation';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

const InputBlock = ({
    onFocusChangeAction,
}: {
    onFocusChangeAction: (focused: boolean) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [groupedProducts, setGroupedProducts] = useState<
        { category: string; products: SearchProduct[] }[]
    >([]);
    const searchRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchSearchData = async () => {
            if (query.length > 1) {
                try {
                    setIsLoading(true);
                    const response = await fetch(`api/search?query=${query}`);
                    const data = await response.json();
                    setGroupedProducts(data);
                } catch (error) {
                    console.error('Ненайден продукт или категория', error);
                    setError('Ненайден продукт или категория');
                } finally {
                    setIsLoading(false);
                }
            } else {
                setGroupedProducts([]);
            }
        };
        const debounceTimer = setTimeout(fetchSearchData, 300);
        return () => clearTimeout(debounceTimer);
    }, [query]);

    const handleInputFocus = () => {
        setIsOpen(!isOpen);
        onFocusChangeAction(true);
    };

    const resetSearch = () => {
        setIsOpen(false);
        setQuery('');
    };

    useEffect(() => {
        const handleClickOutSide = (e: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutSide);

        return () => {
            document.removeEventListener('mousedown', handleClickOutSide);
        };
    }, []);

    const handleSearch = () => {
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);

            resetSearch();
        }
    };

    const handleInputBlur = () => {
        onFocusChangeAction(false);
    };
    return (
        <div className=" relative w-80" ref={searchRef}>
            <div className="relative  rounded-sm border-2 border-(--color-primary) shadow-(--shadow-button-default) leading-2.5">
                <SearchInput
                    handleSearch={handleSearch}
                    query={query}
                    setQuery={setQuery}
                    handleInputFocus={handleInputFocus}
                    handleInputBlur={handleInputBlur}
                />

                {isOpen && (
                    <div className="absolute top-full left-0 w-full mt-1 max-h-63 overflow-y-auto bg-white -border-4 border-gray-300 border-t-0 rounded-b-sm  shadow-lg z-10">
                        {error && (
                            <div className="p-2 text-red-700 text-sm">
                                <button
                                    className="border-2 border-white bg-red-300 text-white text-sm"
                                    onClick={() => setError(null)}
                                >
                                    Обновить
                                </button>
                                {error}
                            </div>
                        )}
                        <SearchResults handleInputFocus={handleInputFocus} query={query} isLoading={isLoading} groupedProducts={groupedProducts}/>
                    </div>
                )}
            </div>
        </div>
    );

};

export default InputBlock;

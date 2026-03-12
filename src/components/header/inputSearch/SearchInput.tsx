import { SearchInputProps } from '@/src/types/SearchInputProps';
import Image from 'next/image';

const SearchInput = ({
    handleSearch,
    query,
    setQuery,
    handleInputFocus,
    handleInputBlur,
    
}: SearchInputProps) => {
    return (
        <div>
            <form
                action=""
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                }}
            >
                <input
                    type="text"
                    value={query}
                    placeholder="Знайти товар"
                    className="w-full h-10 py-2 px-4  outline-none  text-[#8f8f8f] text-base caret-(--color-primary)"
                    onFocus={handleInputFocus}
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={handleInputBlur}
                />

                <button
                    type="button"
                    className="absolute top-2 right-2 w-6 h-6 cursor-pointer"
                    
                >
                    <Image
                        className="absolute top-2 right-2 "
                        src="/лого хедера/searchBtn-headerInput.svg"
                        alt="Searching-Пошук"
                        width={24}
                        height={24}
                        
                    />
                </button>
            </form>
        </div>
    );
};

export default SearchInput;

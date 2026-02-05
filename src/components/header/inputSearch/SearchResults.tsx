import Image from 'next/image';
import Link from 'next/link';
import GlobalLoader from '../../loading/GlobalLoader';
import { PATH_TRANSLATIONS } from '@/UTILS/pathTranslations';
import HighlightText from '../HighlightText';
import { SearchResultsProps } from '@/src/types/searchResultsProps';

const SearchResults = ({
    handleInputFocus,
    query,
    isLoading,
    groupedProducts,
}: SearchResultsProps) => {
    return (
        <div>
            {isLoading ? (
                <GlobalLoader />
            ) : groupedProducts.length > 0 ? (
                <div className="p-2 flex flex-col gap-2.5">
                    {groupedProducts.map((group) => (
                        <div
                            key={group.category}
                            className="flex flex-col gap-2.5 mt-0.5"
                        >
                            <Link
                                href={`/category/${encodeURIComponent(group.category)}`}
                                className="flex items-center justify-between p-2 gap-x-2 hover:bg-gray-100 rounded wrap-break-word cursor-pointer"
                                onClick={handleInputFocus}
                            >
                                <span className="text-gray-700 font-medium wrap-break-word cursor-pointer">
                                    <HighlightText
                                        text={
                                            PATH_TRANSLATIONS[group.category] ||
                                            group.category
                                        }
                                        highLight={query}
                                    />
                                </span>
                                <div className="relative w-6 h-6">
                                    <Image
                                        src="/icon-burger.png"
                                        alt={
                                            PATH_TRANSLATIONS[group.category] ||
                                            group.category
                                        }
                                        fill
                                        style={{
                                            objectFit: 'contain',
                                        }}
                                    />
                                </div>
                            </Link>

                           <ul className="flex flex-col">
  {group.products.map((product) => (
    <li
      key={`${group.category}-${product.id}`}
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
    >
      <Link
        href={`/product/${product.id}`}
        className="flex items-start gap-x-4 wrap-break-word cursor-pointer"
        onClick={handleInputFocus}
      >
        <HighlightText
          text={product.title}
          highLight={query}
        />
      </Link>
    </li>
  ))}
</ul>

                            <div>Товари по запиту...</div>
                        </div>
                    ))}
                </div>
            ) : query.length > 1 ? (
                <div className="text-[#8f8f8f] py-2 px-4 wrap-break-word">
                    Нічого не знайденно
                </div>
            ) : (
                <div className="text-[#f6345] py-2 px-4 wrap-break-word">
                    Введіть більше 2 символів
                </div>
            )}
        </div>
    );
};

export default SearchResults;

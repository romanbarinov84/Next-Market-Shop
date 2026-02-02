import { ProductCardProps } from '@/src/types/product';
import { formatPrice } from '@/UTILS/formatPrice';
import Image from 'next/image';
import StarRating from '../RATING/StarRating';
import Link from 'next/link';

const cardDiscountPercent = 6;

const ProductCard = ({
  _id,
  img,
  description,
  basePrice,
  discountPercent = 0,
  rating,
  tags,
}: ProductCardProps) => {
  const calculateFinalPrice = (price: number, discount: number) => {
    return discount > 0 ? price * (1 - discount / 100) : price;
  };

  const isNewProducts = tags?.includes('new');
  const finalPrice = isNewProducts
    ? basePrice
    : calculateFinalPrice(basePrice, discountPercent);
  const priceByCard = isNewProducts
    ? basePrice
    : calculateFinalPrice(finalPrice, cardDiscountPercent);
  const ratingValue = rating?.rate || 0;

  return (
    <div className="flex flex-col justify-between bg-white rounded overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 w-full sm:w-56 md:w-60 lg:w-64">
      
      {/* Кнопка "Избранное" */}
      <button className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-orange-200 rounded opacity-70 transition-all duration-300">
        <div className="relative w-5 h-5">
          <Image
            src="/ProductCard/Shape (Stroke).svg"
            alt="Обране"
            fill
            className="object-contain"
            sizes="24px"
          />
        </div>
      </button>

      {/* Ссылка на продукт */}
      <Link href={`/product/${_id}`} className="relative">
      <div className="relative w-80 h-40 md:w-56 xl:w-63 "> <Image src={img} alt="Акція" fill className="object-cover rounded-sm transition-transform duration-300 ease-out hover:scale-105" sizes="(max-width: 768) 160px, (max-width: 1200px) 224px , 272px" />
          {discountPercent > 0 && (
            <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm">
              -{discountPercent}%
            </div>
          )}
        </div>

        {/* Контент карточки */}
        <div className="flex flex-col p-3 gap-2">
          {/* Цены */}
          <div className="flex justify-between items-end">
            {/* Цена со скидкой */}
            {finalPrice !== basePrice && (
              <div className="flex flex-col">
                <div className="text-orange-500 font-bold text-sm sm:text-base">
                  {formatPrice(priceByCard)} грн
                </div>
                {cardDiscountPercent > 0 && (
                  <p className="text-red-500 text-xs sm:text-sm">З карткою</p>
                )}
              </div>
            )}

            {/* Базовая цена без зачёркивания */}
            <div className="flex flex-col items-end">
              <div className="text-gray-700 font-semibold text-sm sm:text-base">
                {basePrice.toFixed(2)} грн
              </div>
              <p className="text-gray-400 text-xs sm:text-sm">звичайна</p>
            </div>
          </div>

          {/* Описание */}
          <div className="text-gray-800 text-xs sm:text-sm font-medium line-clamp-3">
            {description}
          </div>

          {/* Рейтинг */}
          {ratingValue > 0 && <StarRating rating={ratingValue} />}
        </div>
      </Link>

      {/* Кнопка "До кошика" */}
      <button className="w-full py-2 text-sm sm:text-base text-orange-500 border border-orange-500 rounded hover:bg-orange-500 hover:text-white transition-colors duration-300">
        До кошика
      </button>
    </div>
  );
};

export default ProductCard;

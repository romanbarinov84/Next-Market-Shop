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
  const calculateFinalPrice = (price: number, discount: number) =>
    discount > 0 ? price * (1 - discount / 100) : price;

  const isNewProducts = tags?.includes('new');
  const finalPrice = isNewProducts
    ? basePrice
    : calculateFinalPrice(basePrice, discountPercent);
  const priceByCard = isNewProducts
    ? basePrice
    : calculateFinalPrice(finalPrice, cardDiscountPercent);
  const ratingValue = rating?.rate || 0;

  return (
   <div className="relative flex flex-col w-full sm:w-56 md:w-60 lg:w-64 rounded overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
  
  {/* Кнопка "Избранное" */}
  <button className="absolute top-2 right-2 z-10 w-8 h-8 p-2 bg-[#f3f2f1] hover:bg-[#fcd5ba] opacity-50 rounded cursor-pointer transition-all duration-300">
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
  <Link href={`/product/${_id}`} className="relative flex-1">
    <div className="relative w-full h-40 sm:h-44 md:h-48 lg:h-52 overflow-hidden rounded-sm">
      <Image
        src={img}
        alt={description}
        fill
        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 224px"
      />
      {discountPercent > 0 && (
        <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm">
          -{discountPercent}%
        </div>
      )}
    </div>

    {/* Контент карточки */}
    <div className="flex flex-col p-3 gap-2 flex-1">
      <div className="flex justify-between items-end">
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

        <div className="flex flex-col items-end">
          <div className="text-gray-700 font-semibold text-sm sm:text-base">
            {basePrice.toFixed(2)} грн
          </div>
          <p className="text-gray-400 text-xs sm:text-sm">звичайна</p>
        </div>
      </div>

      <div className="text-gray-800 text-xs sm:text-sm font-medium line-clamp-3">
        {description}
      </div>

      {ratingValue > 0 && <StarRating rating={ratingValue} />}
    </div>
  </Link>

  {/* Кнопка "До кошика" */}
  <button className="w-full py-2 text-sm sm:text-base text-orange-500 border border-orange-500 rounded hover:bg-orange-500 hover:text-white transition-colors duration-300 mt-auto">
    До кошика
  </button>
</div>

    );
};

export default ProductCard;

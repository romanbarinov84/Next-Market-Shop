import { ProductCardProps } from '@/src/types/product';
import { formatPrice } from '@/UTILS/formatPrice';
import Image from 'next/image';
import StarRating from '../RATING/StarRating';
import Link from 'next/link';
import { CONFIG } from '@/config/config';
import FavoriteButton from './FavoriteButton';
import { calculateFinalPrice, calculatePriceByCard } from '@/UTILS/calcPrices';
import AddToCartButton from '../AddToCartButton';

const cardDiscountPercent = CONFIG.CARD_DISCOUNT_PERCENT;

const ProductCard = ({
   id,
  img,
  description,
  basePrice,
  discountPercent = 0,
  rating,
  tags,
  categories,
}: ProductCardProps) => {
  

  const isNewProducts = tags?.includes('new');
  const finalPrice = isNewProducts
    ? basePrice
    : calculateFinalPrice(basePrice, discountPercent);
  const priceByCard = isNewProducts
    ? basePrice
    : calculatePriceByCard(finalPrice, cardDiscountPercent);
  const ratingValue = rating?.average ?? 0;


 const productId = id;
  const mainCategory = categories?.[0];

  const productUrl = `/catalog/${encodeURIComponent(mainCategory)}/${productId}?desc=${encodeURIComponent(description.substring(0, 50))}`;

  return (
   <div className="relative flex flex-col w-full sm:w-56 md:w-60 lg:w-64 rounded overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
  

  

  <FavoriteButton productId={productId.toString()}/>
  <Link href={productUrl} className="relative flex-1">
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
  <AddToCartButton productId={productId.toString()}/>
</div>

    );
};

export default ProductCard;

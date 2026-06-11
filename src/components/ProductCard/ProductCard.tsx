import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';
import { CONFIG } from '@/config/config';
import { calculateFinalPrice, calculatePriceByCard } from '@/UTILS/calcPrices';

import { formatPrice } from '@/UTILS/formatPrice';
import StarRating from '../RATING/StarRating';
import AddToCartButton from '../AddToCartButton';
import { ProductCardProps } from '@/src/types/product';
import IconCart from '../svg/IconCart';

const cardDiscountPercent = CONFIG.CARD_DISCOUNT_PERCENT;

const ProductCard = ({
    id,
    img,
    description,
    basePrice,
    discountPercent = 0,
    rating,
    categories,
    quantity,
    orderQuantity,
    isOrderPage = false,
}: ProductCardProps) => {
    const finalPrice = calculateFinalPrice(basePrice, discountPercent);

    const priceByCard = calculatePriceByCard(finalPrice, cardDiscountPercent);

    const showTwoPrices = !isOrderPage && discountPercent > 0 && cardDiscountPercent > 0;

    const displayPrice = showTwoPrices ? priceByCard : finalPrice;

    const productId = id;
    const mainCategory = categories?.[0];

    const productUrl = `/catalog/${encodeURIComponent(mainCategory)}/${productId}?desc=${encodeURIComponent(description.substring(0, 50))}`;

    return (
        <div className="relative flex flex-col justify-between w-40 rounded overflow-hidden bg-white md:w-56 xl:w-68 h-88 align-top p-0 hover:shadow-(--shadow-article) duration-300">
            {orderQuantity && (
                <div className="absolute top-2 left-2 text-main-text flex flex-col md:flex-row items-center">
                    <IconCart />
                    {orderQuantity}
                </div>
            )}
            <FavoriteButton productId={productId.toString()} />
            <Link href={productUrl}>
                <div className="relative aspect-square w-40 h-40 md:w-56 xl:w-68">
                    <Image
                        src={img}
                        alt="Товар"
                        fill
                        className="object-contain"
                        priority={false}
                        sizes="(max-width: 768px) 160px, (max-width: 1280px) 224px, 272px"
                    />
                    {!isOrderPage && discountPercent > 0 && (
                        <div className="absolute bg-[#ff6633] py-1 px-2 rounded text-white bottom-2.5 left-2.5">
                            -{discountPercent}%
                        </div>
                    )}
                </div>

                <div className="flex flex-col p-2 h-48">
                    <div className="flex flex-row justify-between items-start h-12">
                        <div className="flex flex-col gap-x-1">
                            <div className="flex flex-row gap-x-1 text-sm md:text-lg font-bold text-main-text">
                                <span>{formatPrice(displayPrice)}</span>
                                <span>uah</span>
                            </div>
                            {showTwoPrices && (
                                <p className="text-[#bfbfbf] text-[8px] md:text-xs">
                                    С картой
                                </p>
                            )}
                        </div>
                        {showTwoPrices && (
                                <div className="flex flex-col gap-x-1">
                                    <div className="flex flex-row gap-x-1 text-xs md:text-base text-[#606060]">
                                        <span>{formatPrice(finalPrice)}</span>
                                        <span>uah</span>
                                    </div>
                                    <p className="text-[#bfbfbf] text-[8px] md:text-xs text-right">
                                        Обычная
                                    </p>
                                </div>
                            )}
                    </div>
                    <div className="h-13.5 text-xs md:text-base text-main-text line-clamp-3 md:line-clamp-2 leading-norman">
                        {description}
                    </div>
                    {<StarRating rating={rating?.rate || 5.0} />}
                </div>
            </Link>
            <AddToCartButton
                productId={productId.toString()}
                availableQuantity={quantity}
            />
        </div>
    );
};

export default ProductCard;

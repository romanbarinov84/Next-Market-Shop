import { ProductCardProps } from '@/src/types/product';
import { formatPrice } from '@/UTILS/formatPrice';
import Image from 'next/image';
import StarRating from '../RATING/StarRating';


    const cardDiscountPercent = 6;

const ProductCard = ({
    img,
    description,
    basePrice,
    discountPercent = 0,
    rating,
    categories,
}: ProductCardProps) => {


    const calculateFinalPrice = (price: number, discount: number): number => {
        return discount > 0 ? price * (1 - discount / 100) : price;
    };

    const calculatePriceByCard = (price: number, discount: number): number => {
        return calculateFinalPrice(price, discount);
    };
    
    const isNewProducts = categories?.includes("new");

    const finalPrice = isNewProducts ? basePrice : calculateFinalPrice(basePrice, discountPercent);

    const priceByCard = isNewProducts ? basePrice : calculatePriceByCard(finalPrice, cardDiscountPercent);

    

    return (
        <div
            className="flex flex-col justify-between items-center w-40 rounded overflow-hidden bg-white 
     md:w-56 xl:w-63 align-top  hover:shadow-(--shadow-article) duration-300"
        >
            <div className="relative w-80 h-40 md:w-56 xl:w-63 ">
                <Image
                    src={img}
                    alt="Акція"
                    fill
                    className="object-cover 
                    rounded-sm transition-transform
                    duration-300
                    ease-out
                    hover:scale-105"
                    sizes="(max-width: 768) 160px, (max-width: 1200px) 224px , 272px"
                />
                <button className="w-8 h-8 justify-center items-center bg-[#f3f2f1] hover:bg-[#fcd5ba] p-1 absolute top-5 right-2 opacity-50 rounded cursor-pointer duration-300">
                    <Image
                        src="/ProductCard/Shape (Stroke).svg"
                        alt="Обранне"
                        width={24}
                        height={24}
                        sizes="24px"
                    />
                </button>
                {discountPercent && (
                    <div className="absolute bg-[#ff6633] py-1 px-3 rounded text-white bottom-2.5 left-2.5">
                        -{discountPercent}%
                    </div>
                )}
            </div>
            <div className="flex flex-col justify-between p-2 gap-y-2 gap-x-4">
                <div className="flex flex-row mb-3 justify-between items-end gap-8">
                    {finalPrice !== basePrice && (
                        <div className="flex- flex-col gap-x-1 text-xs">
                            <div className="flex flex-row gap-x-1 text-xs md:text-lg font-bold text-[#ff6633]">
                                <span>{formatPrice(priceByCard)}</span>
                                <span>грн</span>
                            </div>
                            {cardDiscountPercent > 0 && (
                                <p className="text-[#f70505] text-4.5 md:text-xs">
                                    {'З карткою'}
                                </p>
                            )}
                        </div>
                    )}

                    <div className="flex flex-col gap-x-1">
                        <div className="flex flex-row gap-x-1 text-xs font-bold md:text-lg text-[#333]">
                            <span>{basePrice.toFixed(2)}</span>
                            <span>грн</span>
                        </div>
                        <p className="text-[#bfbfbf] text-xs md:text-xs">
                            звичайна
                        </p>
                    </div>
                </div>
                <div className="h-13 text-xs m-2 md:text-base text-[#414141] font-black line-clamp-3 md:line-clamp-2 leading-1.5 pt-2 xl:pt-3">
                    {description}
                </div>
                {rating > 0 && <StarRating rating={rating}/>}
                <button
                    className=" w-full h-10 rounded border border-(--color-primary) text-(--color-primary) hover:bg-[#ff6633] hover:text-white hover:border-transparent
                     active:shadow-(--shadow-button-active)  transition-all duration-300 flex justify-center items-center cursor-pointer select-none "
                >
                    До кошика
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

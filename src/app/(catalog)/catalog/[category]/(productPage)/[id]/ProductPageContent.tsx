import Image from "next/image";
import { CONFIG } from "../../../../../../../config/config";
import { getReviewsWord } from "@/UTILS/reviewsWord";
import Bonuses from "./_components/Bonuses";
import CartButton from "./_components/CartButton";
import ProductOffer from "./_components/ProductOffer";
import ImagesBlock from "./_components/ImagesBlock";
import ShareButton from "./_components/ShareButton";
import StarRating from "@/src/components/RATING/StarRating";
import { ProductCardProps } from "@/src/types/product";

interface ProductPageContentProps {
  product: ProductCardProps;
  productId: string;
}

const ProductPageContent = ({
  product,
 
}: ProductPageContentProps) => {
  const discountedPrice = product.discountPercent
    ? product.basePrice * (1 - product.discountPercent / 100)
    : product.basePrice;

  const cardPrice = discountedPrice * (1 - CONFIG.CARD_DISCOUNT_PERCENT / 100);
  const bonusesAmount = cardPrice * 0.05;

  return (
    <div className="px-[max(12px,calc((100%-1208px)/2))] md:px-[max(16px,calc((100%-1208px)/2))] text-main-text">
      <h1 className="text-2xl font-bold mb-4">{product.description}</h1>
      <div className="flex flex-col gap-y-25 md:gap-y-20 xl:gap-y-30">
        <div className="flex flex-row flex-wrap items-center gap-6 mb-4 md:mb-6">
          <div className="text-xs">арт. {product.article}</div>
          <div className="flex flex-row flex-wrap gap-2 items-center">
            <StarRating rating={product.rating.average || 5} />
            <p className="text-sm underline">
              {product.rating.count || 0}{" "}
              {getReviewsWord(product.rating.count || 0)}
            </p>
          </div>
          <ShareButton title={product.title} />
          <button className="flex flex-row flex-wrap gap-2 items-center cursor-pointer">
            <Image
              src="/favoriteIcon.png"
              alt="Избранное"
              width={24}
              height={24}
              className="select-none"
            />
            <p className="text-sm">В избранное</p>
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-10 w-full justify-center">
          <ImagesBlock product={product} />
          <div className="md:w-86 lg:w-94 flex flex-col">
            <ProductOffer
              discountedPrice={discountedPrice}
              cardPrice={cardPrice}
            />
            <CartButton />
            <Bonuses bonus={bonusesAmount} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl xl:text-4xl text-left font-bold text-main-text mb-4 md:mb-8 xl:mb-10">
            Отзывы
          </h2>
          <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-x-8 xl:gap-x-36"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageContent;
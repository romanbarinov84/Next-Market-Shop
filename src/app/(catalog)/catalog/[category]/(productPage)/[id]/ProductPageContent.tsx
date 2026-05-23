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
import DiscountMessage from "./_components/DiscountMessage";
import { AdditionalInfo } from "../../_components/AdditionalInfo";
import SimilarProducts from "../../_components/SimilarProducts";
import SameBrandProducts from "../../_components/SameBrandProducts";
import RatingDistribution from "../../_components/RatingDistribution";
import ReviewsWrapper from "../../_components/ReviewsWrapper";
import Link from "next/link";
import { calculateFinalPrice, calculatePriceByCard } from "@/UTILS/calcPrices";


interface ProductPageContentProps {
  product: ProductCardProps;
  productId: string;
}

const ProductPageContent = ({
  product,
  productId
}: ProductPageContentProps) => {

  const priceWithDiscount = calculateFinalPrice(product.basePrice , product.discountPercent)
  const cardPrice = calculatePriceByCard(priceWithDiscount , CONFIG.BONUSES_PERCENT);

  const bonusesAmount = Math.round((priceWithDiscount * CONFIG.BONUSES_PERCENT) / 100 )

  return (
    <div className="px-[max(12px,calc((100%-1408px)/2))] md:px-[max(16px,calc((100%-1208px)/2))] text-main-text ">
      <div className="bg-white/40 border border-gray-100 rounded-3xl shadow-lg mb-8 p-4 md:p-6 xl:p-8">
         <h1 className="text-xl md:text-2xl font-bold mb-4">{product.description}</h1>
      <div className="flex flex-col gap-y-25 md:gap-y-20 xl:gap-y-30">
        <div className="flex flex-row flex-wrap items-center gap-6 mb-4 md:mb-6 bg-amber-50 p-5 rounded-full">
          <div className="text-xs">арт. {product.article}</div>
          <div className="flex flex-row flex-wrap gap-2 items-center">
            <StarRating rating={product.rating.average || 5} />
            <p className="text-sm underline">
              {product.rating.count || 0}{" "}
              {getReviewsWord(product.rating.count || 0)}
            </p>
          </div>
          <ShareButton title={product.title} />
          <Link href="/favorite" className="flex flex-row  flex-wrap gap-2 items-center cursor-pointer">
            <Image
              src="/ProductCard/Shape (Stroke).svg"
              alt="Избранное"
              width={24}
              height={24}
              className="select-none"
            />
            <p className="text-sm">В избранное</p>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-10 w-full justify-center bg-amber-50 p-5">
          <ImagesBlock product={product} />
          <div className="md:w-86 lg:w-94 flex flex-col">
            <ProductOffer
              discountedPrice={priceWithDiscount}
              cardPrice={cardPrice}
            />
            <CartButton productId={productId}/>
            <Bonuses bonus={bonusesAmount} />
            <DiscountMessage
              productId={productId.toString()}
              productTitle={product.title}
              currentPrice={priceWithDiscount.toString()}
            />
             <AdditionalInfo
              brand={product.brand}
              manufacturer={product.manufacturer}
              weight={product.weight}
            />
          </div>
          <SimilarProducts currentProduct={product} />
        </div>
         <SameBrandProducts currentProduct={product} />
        <div className="bg-amber-50 p-5 rounded-sm">
          <h2 className="text-2xl xl:text-4xl text-left font-bold text-main-text mb-4 md:mb-8 xl:mb-10">
            Отзывы
          </h2>
          <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-x-8 xl:gap-x-36"></div>
          <RatingDistribution
              averageRating={product.rating.rate}
              distribution={product.rating.distribution}
            />
             <ReviewsWrapper productId={productId} />
        </div>
      </div>
    </div>
      </div>
     
  );
};

export default ProductPageContent;
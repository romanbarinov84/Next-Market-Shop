
import { ProductCardProps } from "@/src/types/product";
import Image from "next/image";

const ImagesBlock = ({ product }: { product: ProductCardProps }) => {
  return (
    <div className="flex flex-row gap-x-4 h-62 xl:h-124">
      <div className="flex flex-col justify-between h-full shrink-0">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="relative bg-white w-16 h-9.25 xl:h-21.5 flex items-center justify-center overflow-hidden shrink-0"
          >
            <Image
              src={product.img}
              alt={`${product.title} - миниатюра ${index + 1}`}
              width={64}
              height={86}
              className="w-full h-full object-cover"
              sizes="64px"
            />
          </div>
        ))}
      </div>

      <div
        className="relative flex justify-center items-center shadow-image-block bg-white 
                     h-62 xl:h-124 
                     w-62 md:w-68 xl:w-126 
                     p-2.5 shrink-0"
      >
        <Image
          src={product.img}
          alt={product.title}
          width={504}
          height={496}
          className="w-full h-full object-contain"
          sizes="(max-width: 768px) 248px, (max-width: 1032px) 272px, 504px"
          priority
        />
        {product.discountPercent && product.discountPercent > 0 ? (
          <div className="absolute top-5 right-5 bg-[#ff6633] text-white px-2 py-1 rounded text-sm">
            -{product.discountPercent}%
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ImagesBlock;
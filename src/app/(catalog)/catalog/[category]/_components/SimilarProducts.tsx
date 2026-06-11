import { ProductCardProps } from '@/src/types/product';
import Image from 'next/image';
import Link from 'next/link';

interface SimilarProductsProps {
    currentProduct: ProductCardProps;
}

interface SimilarProduct {
    id: string;
    title: string;
    img: string;
    basePrice: number;
    discountPercent: number;
    categories: string[];
}

const SimilarProducts = async ({ currentProduct }: SimilarProductsProps) => {
    try {
        const category = currentProduct.categories[0];

        if (!category) return null;

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/similar-products?productId=${currentProduct.id}&category=${category}&limit=4`,
            {
                next: { revalidate: 3600 },
            },
        );

        if (!response.ok) {
            throw new Error('Не удалось получить похожие продукты');
        }

        const data = await response.json();
        const similarProducts: SimilarProduct[] = data.similarProducts;

        if (similarProducts.length === 0) {
            return null;
        }

        const calculatePrice = (product: SimilarProduct) => {
            const discount =
                product.basePrice * (product.discountPercent / 100);
            return product.basePrice - discount;
        };

        return (
            <div className="mx-auto flex flex-col items-center">
                <div className="w-full max-w-85 md:max-w-172 xl:max-w-40">
                    <h3 className="text-sm md:text-lg font-semibold mb-2 text-[#606060] text-left">
                        Также покупают
                    </h3>
                </div>

                <div className="flex flex-row xl:flex-row  md:gap-4 justify-center xl:justify-start bg-amber-100 p-5">
                    {similarProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={`/catalog/product/${product.id}`}
                            className="group flex flex-col w-23 md:w-35 xl:w-40 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                        >
                            <div className="relative w-full h-20 md:h-25 xl:h-28 bg-gray-50 flex items-center justify-center">
                                <Image
                                    src={product.img}
                                    alt={product.title}
                                    fill
                                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 90px, (max-width: 1280px) 140px, 150px"
                                />
                            </div>

                            <div className="p-1.5 flex flex-col gap-0.5">
                                <p className="text-[10px] md:text-xs line-clamp-2 text-gray-700">
                                    {product.title}
                                </p>

                                <div className="font-bold text-xs md:text-sm">
                                    {calculatePrice(product)} uah
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching similar products:', error);
        return null;
    }
};

export default SimilarProducts;

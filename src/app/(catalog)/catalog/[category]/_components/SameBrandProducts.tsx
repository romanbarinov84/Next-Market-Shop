import ProductsSection from "@/src/app/(products)/ProductsSection";
import { ProductCardProps } from "@/src/types/product";


interface SameBrandProductsProps {
  currentProduct: ProductCardProps;
}

const SameBrandProducts = async ({ currentProduct }: SameBrandProductsProps) => {
  if (!currentProduct.brand) return null;

  let sameBrandProducts: ProductCardProps[] = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/brand?brand=${currentProduct.brand}&productId=${currentProduct.id}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (response.ok) {
      const data = await response.json();
      sameBrandProducts = data.sameBrandProducts || [];
    }
    
  } catch (error) {
    console.error('Ошибка при получении товаров этого же бренда:', error);
  }

  if (!sameBrandProducts || sameBrandProducts.length === 0) return null;

  return (
    <ProductsSection
      title="С этим товаром покупают"
      products={sameBrandProducts}
      viewAllButton={{ text: 'На головну', href: '/' }}
    />
  );
};

export default SameBrandProducts;
import ProductCard from '../../../components/ProductCard/ProductCard';
import { ProductCardProps } from '@/src/types/product';
import ViewAllButton from '../../../components/allButton/ViewAllButton';
import fetchPurchases from '../fetchPurchases';
import ProductsSection from '../../(products)/ProductsSection';

const Purchases = async () => {
  let purchases: ProductCardProps[] = [];
  let error: string | null = null;

  try {
    purchases = await fetchPurchases("purchases");
  } catch (err) {
    error = 'Ошибка получения купленных продуктов';
    console.error('Ошибка в компоненте Purchases:', err);
  }

  if (error) {
    return <div className="text-red-500">Ошибка: {error}</div>;
  }

  return (
    <ProductsSection
      title="Покупки"
      viewAllButton={{ text: 'Усі покупки', href: 'purchases' }}
      products={purchases}
      compact
    />
  );
};

export default Purchases;

import fetchPurchases from '../fetchPurchases';
import ProductsSection from '../../(products)/ProductsSection';
import { CONFIG } from '@/config/config';
import ErrorComponent from '@/src/components/errorComponent/ErrorComponent';

const Purchases = async () => {
  let items = [];

  try {
    const result = await fetchPurchases({
      userPurchasesLimit: CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS,
    });
    items = result.items;
  } catch (error) {
    return <ErrorComponent error={error instanceof Error ? error : new Error(String(error))}  userMessage='Неудалось загрузить статьи' />
  }

  return (
    <ProductsSection
      title="Покупки"
      viewAllButton={{ text: 'Усі покупки', href: 'purchases' }}
      products={items}
      compact
    />
  );
};

export default Purchases;

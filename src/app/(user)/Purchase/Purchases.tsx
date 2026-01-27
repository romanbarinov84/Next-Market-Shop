import fetchPurchases from '../fetchPurchases';
import ProductsSection from '../../(products)/ProductsSection';
import { CONFIG } from '@/config/config';

const Purchases = async () => {
  let items = [];

  try {
    const result = await fetchPurchases({
      userPurchasesLimit: CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS,
    });
    items = result.items;
  } catch (error) {
    console.error('Ошибка загрузки покупок', error);
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

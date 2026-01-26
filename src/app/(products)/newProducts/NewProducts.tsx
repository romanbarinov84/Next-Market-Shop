

import { CONFIG } from '@/config/config';
import fetchProductsByCategory from '../fetchProducts';
import ProductsSection from '../ProductsSection';

const NewProducts = async () => {
    const {items} = await fetchProductsByCategory('new' , {randomLimit:CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS});

    if (!items || items.length === 0) {
        return (
            <div className="text-red-500 text-center">
                Новые товары не найдены
            </div>
        );
    }

    return (
        <ProductsSection
            title="Новинки"
            viewAllButton={{ text: 'Усі новинки', href: 'new' }}
            products={items}
            compact
        />
    );
};

export default NewProducts;

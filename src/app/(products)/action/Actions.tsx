

import fetchProductsByCategory from '../fetchProducts';
import ProductsSection from '../ProductsSection';
import { CONFIG } from '@/config/config';

const Actions = async () => {

    
    const {items} = await fetchProductsByCategory('actions' , {randomLimit:CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS});
    

    if (!items || items.length === 0) {
        return (
            <div className="text-red-500 text-center">
                Акционные товары не найдены
            </div>
        );
    }

    return (
        <ProductsSection
            title="Акції"
            viewAllButton={{ text: 'Усі акції', href: 'actions' }}
            products={items}
            compact
        />
    );
};

export default Actions;

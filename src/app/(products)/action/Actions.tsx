
import { shuffleArray } from '@/UTILS/shuffleArray';
import fetchProductsByCategory from '../fetchProducts';
import ProductsSection from '../ProductsSection';

const Actions = async () => {
    let products = await fetchProductsByCategory('actions');
    products = shuffleArray(products)

    if (!products || products.length === 0) {
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
            products={products}
            compact
        />
    );
};

export default Actions;

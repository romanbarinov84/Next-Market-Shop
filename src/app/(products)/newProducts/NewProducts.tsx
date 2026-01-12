
import { shuffleArray } from '@/UTILS/shuffleArray';
import fetchProductsByCategory from '../fetchProducts';
import ProductsSection from '../ProductsSection';

const NewProducts = async () => {
    let products = await fetchProductsByCategory('new');
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
            title="Новинки"
            viewAllButton={{ text: 'Усі новинки', href: 'new' }}
            products={products}
            compact
        />
    );
};

export default NewProducts;

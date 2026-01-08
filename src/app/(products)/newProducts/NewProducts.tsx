
import fetchProductsByCategory from '../fetchProducts';
import ProductsSection from '../ProductsSection';

const Actions = async () => {
    const products = await fetchProductsByCategory('actions');

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

export default Actions;

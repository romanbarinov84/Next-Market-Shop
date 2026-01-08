import fetchProductsByCategory from '../fetchProducts';
import ProductsSection from '../ProductsSection';

const AllActions = async () => {
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
            title="Усі акції"
            viewAllButton={{ text: 'На головну', href: '/' }}
            products={products}
            
        />
    );
};

export default AllActions;

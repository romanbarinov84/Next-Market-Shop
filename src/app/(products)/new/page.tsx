import fetchProductsByCategory from '../fetchProducts';
import ProductsSection from '../ProductsSection';


export const metaData = {
    title:'Новинки магазина "Балувана Галя"',
    description:'Нові товари магазина "Балувана Галя"',
}

const AllNew = async () => {
    const products = await fetchProductsByCategory('new');

    if (!products || products.length === 0) {
        return (
            <div className="text-red-500 text-center">
                Новые товары не найдены
            </div>
        );
    }

    return (
        <ProductsSection
            title="Усі новинки"
            viewAllButton={{ text: 'На головну', href: '/' }}
            products={products}
            
        />
    );
};

export default AllNew;

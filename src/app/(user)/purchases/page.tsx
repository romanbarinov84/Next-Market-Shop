
import ProductsSection from '../../(products)/ProductsSection';
import fetchPurchases from '../fetchPurchases';


const AllPurchases = async () => {
    const purchases = await fetchPurchases("purchases");

    if (!purchases || purchases.length === 0) {
        return (
            <div className="text-red-500 text-center">
            Купленные товары не найдены
            </div>
        );
    }

    return (
        <ProductsSection
            title="Усі покупки"
            viewAllButton={{ text: 'На головну', href: '/' }}
            products={purchases}
            
        />
    );
};

export default AllPurchases;

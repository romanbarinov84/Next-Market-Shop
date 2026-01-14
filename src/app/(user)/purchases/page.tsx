
import fetchProductsByCategory from '../../(products)/fetchProducts';
import GenericProductListPage from '../../(products)/GenericProductListPage';
import fetchPurchases from '../fetchPurchases';



const AllPurchases =  async({
    searchParams,
}:{
    searchParams:Promise<{page?:string;
        itemsPerPage?:string
    }>;
}) => {
    
  return (
    <GenericProductListPage
    searchParams={searchParams}
    props={{
        fetchData: () => 
            fetchPurchases(),
        pageTitle:"Усі покупки",
        basePath:"/purchases",
        errorMessage:"Помилка невдалося завантажити покупки",
    }}
    />
  )
};
export default AllPurchases;

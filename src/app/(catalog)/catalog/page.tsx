

import { Suspense } from 'react';
import CatalogPage from './CatalogPage'
import GlobalLoader from '@/src/components/loading/GlobalLoader';


export const metadata = {
    title:"Каталог товаров",
    description: "Catalog of products",
};

const page = () => {

  return (
    <Suspense fallback={<GlobalLoader/>}>
      <CatalogPage/>
    </Suspense>
        
    
  )
}

export default page
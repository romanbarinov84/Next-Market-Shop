
import { ProductCardProps } from "@/src/types/product";



const fetchPurchases = async(category:string) => {
   
    try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL!}/api/users/purchases`,
                {next:{revalidate:3600}}
            );

            if(!res.ok) throw new Error(`Ошибка получения продуктов покупок`)
           const purchases: ProductCardProps[] = await res.json();
         
            return purchases
        } catch (err) {
            console.error(`Ошибка в компоненте Purchases`, err);
             throw err ;
        }

}

export default fetchPurchases
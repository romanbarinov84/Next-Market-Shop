import { ProductCardProps } from "@/src/types/product";
import { shuffleArray } from "@/UTILS/shuffleArray";


const fetchProductsByCategory = async(category:string) => {
   
    try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL!}/api/products?category=${category}`,
                {next:{revalidate:3600}}
            );

            if(!res.ok) throw new Error(`Ошибка получения продуктов ${category}`)
           const Products: ProductCardProps[] = await res.json();


            const availableProducts = Products.filter(product => product.quantity > 0)

           return shuffleArray(availableProducts);

            
        } catch (err) {
            console.error(`Ошибка в компоненте ${category}`, err);
             throw err ;
        }

}

export default fetchProductsByCategory
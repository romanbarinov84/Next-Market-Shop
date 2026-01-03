import Image from 'next/image';

import ProductCard from '../../../components/ProductCard/ProductCard';
import { ProductCardProps } from '@/src/types/product';
import ViewAllButton from '../../../components/allButton/ViewAllButton';

const NewProducts = async () => {
    let Products: ProductCardProps[] = [];
    let error = null;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL!}/api/products?category=new`
        );
        Products = await res.json();
    } catch (err) {
        console.error('Ошибка в компоненте newProducts', err);
        error = 'Ошибка получения новинок';
    }

    if (error) {
        return (
            <div className="text-red-500">
                Ошибка в компоненте NewProducts: {error}
            </div>
        );
    }
    return (
        <section>
            <div className="flex flex-col justify-center xl:max-w-302">
                <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between">
                    <h2 className="text-2xl xl:text-4xl text-left font-bold">
                        Новинки
                    </h2>
                    <ViewAllButton text="Усі новинки" href="new" />
                </div>
                <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
                    {Products.slice(0, 4).map((item, index) => (
                        <li
                            key={item._id}
                            className={`${index >= 4 ? 'hidden' : ''} 
                    ${index >= 3 ? 'md:hidden xl:block' : ''}
                    `}
                        >
                            <ProductCard {...item} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default NewProducts;

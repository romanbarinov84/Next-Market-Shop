
import ProductCard from '../ProductCard/ProductCard';
import { ProductCardProps } from '@/src/types/product';
import { shuffleArray } from '@/UTILS/shuffleArray';
import ViewAllButton from '../allButton/ViewAllButton';

const Actions = async () => {
    let Products: ProductCardProps[] = [];
    let error = null;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL!}/api/products?category=actions`
        );
        Products = await res.json();

         Products = shuffleArray(Products);
    } catch (err) {
        console.error('Ошибка в компоненте Actions', err);
        error = 'Ошибка получения акцій';
    }

    if (error) {
        return (
            <div className="text-red-500">
                Ошибка в компоненте Actions: {error}
            </div>
        );
    }

    return (
        <section>
            <div className="flex flex-col justify-center xl:max-w-302">
                <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between">
                    <h2 className="text-2xl xl:text-4xl text-left font-bold">
                        Акції
                    </h2>
                   <ViewAllButton text="Усі акції" href="actions"/>
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

export default Actions;

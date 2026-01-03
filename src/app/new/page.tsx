import ViewAllButton from '@/src/components/allButton/ViewAllButton';
import ProductCard from '@/src/components/ProductCard/ProductCard';
import { ProductCardProps } from '@/src/types/product';
import { shuffleArray } from '@/UTILS/shuffleArray';

const AllNew = async () => {
    let Products: ProductCardProps[] = [];
    let error = null;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL!}/api/products?category=new`
        );
        Products = await res.json();
        Products = shuffleArray(Products);
    } catch (err) {
        console.error('Ошибка в компоненте Actions', err);
        error = 'Ошибка получения акцій';
    }

    if (error) {
        return (
            <div className="text-red-500 text-center">
                Ошибка получения всех акционных продуктов: {error}
            </div>
        );
    }

    return (
        <section className="flex justify-center mb-20 mt-10 px-4 md:px-8">
            {/* КАРТОЧКА-СЕКЦИЯ */}
            <div
                className="
                    w-full 
                    max-w-[1200px]
                    bg-white/70
                    backdrop-blur-md
                    rounded-2xl
                    shadow-lg
                    shadow-black/10
                    p-4 md:p-6 xl:p-8
                "
            >
                <div className="mb-4 md:mb-8 xl:mb-10 flex justify-between items-center">
                    <h2 className="text-2xl xl:text-4xl font-bold">
                        Новинки
                    </h2>

                    <ViewAllButton text="На головну" href="/" />
                </div>

                <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
                    {Products.map((item) => (
                        <li key={item._id}>
                            <ProductCard {...item} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default AllNew;

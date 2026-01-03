import ViewAllButton from '@/src/components/allButton/ViewAllButton';
import ProductCard from '@/src/components/ProductCard/ProductCard';
import { ProductCardProps } from '@/src/types/product';

const AllPurchases = async () => {
    let purchases: ProductCardProps[] = [];
    let error = null;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL!}/api/users/purchases`
        );
        purchases = await res.json();
    } catch (err) {
        error = 'Ошибка получения всех купленных продуктов';
        console.error('Ошибка в компоненте AllPurchases:', err);
    }

    if (error) {
        return <div className="text-red-500">Ошибка: {error}</div>;
    }
    return (
         <section className="flex justify-center mb-20 mt-10 px-4 md:px-8">
            <div className="
                    w-full 
                    max-w-[1200px]
                    bg-white/70
                    backdrop-blur-md
                    rounded-2xl
                    shadow-lg
                    shadow-black/10
                    p-4 md:p-6 xl:p-8
                ">
                <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between">
                    <h2 className="text-2xl xl:text-4xl text-left font-bold">
                        Покупки
                    </h2>
                    <ViewAllButton text="На головну" href="/" />
                </div>
                <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
                    {purchases.map((item) => (
                        <li key={item._id}>
                            <ProductCard {...item} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default AllPurchases;

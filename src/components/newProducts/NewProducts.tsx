import Image from 'next/image';
import database from '@/DATA/dataBase.json';
import ProductCard from '../ProductCard/ProductCard';


const NewProducts = () => {
  
     const newProducts = database.products.filter((p) =>
        p.categories.includes('new')
     );
    return (
        <section>
            <div className="flex flex-col justify-center xl:max-w-302">
                <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between">
                    <h2 className="text-2xl xl:text-4xl text-left font-bold">
                        Новинки
                    </h2>
                    <button className="flex flex-row items-center gap-x-2 cursor-pointer">
                        <p className="text-base text-center text-[#606060] hover:text-[#bfbfbf]">
                            Усі новинки
                        </p>
                        <Image
                            src="/ProductCard/arrow-Right.svg"
                            alt="усі акції"
                            width={24}
                            height={24}
                            sizes="24px"
                        />
                    </button>
                </div>
                <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
                    {newProducts.slice(0,4).map((item, index) => (
                        <li
                            key={item.id}
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
  
}

export default NewProducts
import Image from 'next/image';

const ProductCard = () => {
    return (
        <div
            className="flex flex-col justify-between items-center w-40 rounded overflow-hidden bg-white 
     md:w-56 xl:w-63 align-top p-1 hover:shadow-(--shadow-article) duration-300"
        >
            <div className="relative w-80 h-40 md:w-56 xl:w-63 ">
                <Image
                    src="/ProductsCategory-Img/Вегетаріанські страви/Perets-farshyrovanyj-z-grybamy-178.webp"
                    alt="Акція"
                    fill
                    className="object-cover rounded-sm"
                    sizes="(max-width: 768) 160px, (max-width: 1200px) 224px , 272px"
                />
                <button className="w-8 h-8 bg-[#f3f2f1] hover:bg-[#fcd5ba] absolute top-5 right-2 opacity-50 rounded cursor-pointer duration-300">
                    <Image
                        src="/ProductCard/Shape (Stroke).svg"
                        alt="Обранне"
                        width={24}
                        height={24}
                        sizes="24px"
                    />
                </button>

                <div className="absolute bg-[#ff6633] py-1 px-3 rounded text-white bottom-2.5 left-2.5">
                    {'Скидка'}
                </div>
            </div>
            <div className="flex flex-col justify-between p-2 gap-y-2">
                <div className="flex flex-row mb-3 justify-between items-end">
                    <div className="flex- flex-col gap-x-1">
                        <div className="flex flex-row gap-x-1 text-sm md:text-lg font-bold">
                            <span>Ціна з карткою : 00.00</span>
                            <span>грн</span>
                        </div>
                        <p className="text-[#bfbfbf] text-4.5 md:text-xs">
                            {'З карткою'}
                        </p>
                    </div>
                    <div className="flex flex-col gap-x-1">
                        <div className="flex flex-row gap-x-1 text-xs md:text-base text-[#333]">
                            <span>{'ціна остаткова'}</span>
                            <span>uah</span>
                        </div>
                        <p className="text-[#bfbfbf] text-2 md:text-xs">
                            звичайна
                        </p>
                    </div>
                </div>
                <div className="h-13 text-xs m-3 md:text-base text-[#414141] line-clamp-3 md:line-clamp-2 leading-1.5 ">
                    {'Про товар'}
                </div>
                <span>{'Рейтинг'}</span>
                <button
                    className="
    w-full h-10 rounded
    border border-(--color-primary)
    text-(--color-primary)
    hover:bg-[#ff6633]
    hover:text-white
    hover:border-transparent
    active:shadow-(--shadow-button-active)
    transition-all duration-300
    flex justify-center items-center
    cursor-pointer select-none
  "
                >
                    До кошика
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

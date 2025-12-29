import articlesDataBase from '@/DATA/articlesDataBase.json';
import Image from 'next/image';

const Articles = () => {
    const articles = articlesDataBase;

    return (
        <div>
            <section className="mt-16 sm:mt-20 lg:mt-24 mb-16 sm:mb-20 lg:mb-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between cursor-pointer">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-zinc-900 mb-8">
                            Наші статті
                        </h2>
                        <Image
                            src="/ProductCard/arrow-Right.svg"
                            alt="усі акції"
                            width={24}
                            height={24}
                            sizes="24px"
                        />
                    </div>

                    {/* Сетка карточек */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                        {articles.map((article) => (
                            <li key={article.id}>
                                <div className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:-translate-y-1 hover:shadow-lg h-full flex flex-col">
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={article.img}
                                            alt={article.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 33vw"
                                        />
                                    </div>

                                    <div className="p-5 flex flex-col flex-grow">
                                        <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                                            {article.title}
                                        </h3>

                                        <p className="text-sm text-zinc-600 mb-4 line-clamp-3">
                                            {article.text}
                                        </p>

                                        <button className="mt-auto text-sm font-medium text-indigo-600 hover:underline">
                                            Читати далі →
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default Articles;

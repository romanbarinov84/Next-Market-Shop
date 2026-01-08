import { Article } from '@/src/types/articles';
import { shuffleArray } from '@/UTILS/shuffleArray';
import ViewAllButton from '../../../components/allButton/ViewAllButton';
import ArticleCard from './ArticleCard';

const Articles = async () => {
    let articles: Article[] = [];
    let error = null;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL!}/api/articles`
        );
        articles = await res.json();
        articles = shuffleArray(articles);
    } catch (err) {
        console.error('Ошибка в компоненте Article', err);
        error = 'Ошибка получения статей';
    }

    if (error) {
        return (
            <div className="text-red-500">
                Ошибка в компоненте Article: {error}
            </div>
        );
    }
    return (
        <div>
            <section className="mt-16 sm:mt-20 lg:mt-24 mb-16 sm:mb-20 lg:mb-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between cursor-pointer">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-zinc-900 mb-8">
                            Наші статті
                        </h2>
                        <ViewAllButton text="До статей" href="articles" />
                    </div>

                    {/* Сетка карточек */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                        {articles.slice(0, 3).map((article) => (
                            <li key={article._id}>
                                <ArticleCard {...article}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default Articles;

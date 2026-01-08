
import { Article } from '@/src/types/articles';
import { shuffleArray } from '@/UTILS/shuffleArray';
import ArticlesSection from '../ArticlesSection';

export const metaData = {
    title:'Пости магазина "Балувана Галя"',
    description:'Пости на сайті магазина "Балувана Галя"',
}

const AllArticles = async () => {
  let articles: Article[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`);
    if (!res.ok) throw new Error(`Ошибка получения статей: ${res.status}`);
    articles = await res.json();
    articles = shuffleArray(articles);
  } catch (err) {
    console.error('Ошибка в компоненте AllArticles', err);
    error = 'Ошибка получения статей';
  }

  if (error) {
    return <div className="text-red-500">Ошибка: {error}</div>;
  }

  return (
     <ArticlesSection
        title="Усі пости"
        viewAllButton={{ text: "На головну", href: "/" }}
        articles={articles}
      />
  );
};

export default AllArticles;

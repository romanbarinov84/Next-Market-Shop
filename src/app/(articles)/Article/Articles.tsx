import { Article } from '@/src/types/articles';
import { shuffleArray } from '@/UTILS/shuffleArray';
import ArticlesSection from '../ArticlesSection';

// если используешь отдельный компонент

const Articles = async () => {
  let articles: Article[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`);
    if (!res.ok) throw new Error(`Ошибка получения статей: ${res.status}`);
    articles = await res.json();
    articles = shuffleArray(articles);
  } catch (err) {
    console.error('Ошибка в компоненте Articles', err);
    error = 'Ошибка получения статей';
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <ArticlesSection
      title="Наші пости"
      viewAllButton={{ text: 'Усі пости', href: 'articles' }}
      articles={articles.slice(0, 3)} // только первые 3
      compact
    />
  );
};

export default Articles;

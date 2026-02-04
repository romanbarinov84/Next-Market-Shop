
import ErrorComponent from '@/src/components/errorComponent/ErrorComponent';
import ArticlesSection from '../ArticlesSection';
import fetchArticles from '../fetchArticles';
import { CONFIG } from '@/config/config';



const Articles = async () => {
    let items = [];

  try {
    const result = await fetchArticles({
      articlesLimit: CONFIG.ITEMS_PER_PAGE_MAIN_ARTICLES,
    });
    items = result.items;
  } catch (error) {
    return <ErrorComponent error={error instanceof Error ? error : new Error(String(error))}  userMessage='Неудалось загрузить статьи' />
  }

    return (
        <ArticlesSection
            title="Наші пости"
            viewAllButton={{ text: 'Усі пости', href: 'articles' }}
            articles={items} 
            compact
        />
    );
};

export default Articles;

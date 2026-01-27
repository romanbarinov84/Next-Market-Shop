
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
    console.error('Ошибка загрузки покупок', error);
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

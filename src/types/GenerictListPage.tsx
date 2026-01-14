
import { ArticlesCardProps } from './ArticlesListPageProps';
import { ProductCardProps } from './product';

type ContentItem = ProductCardProps | ArticlesCardProps;

export interface GenericListPageProps {
    fetchData: () => Promise<ContentItem[]>;
    pageTitle: string;
    basePath: string;
    errorMessage: string;
    contentType?: 'articles';
    
}

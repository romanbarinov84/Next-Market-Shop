
import { ArticlesCardProps } from './ArticlesListPageProps';
import { ProductCardProps } from './product';

type ContentItem = ProductCardProps | ArticlesCardProps;

interface PaginatedResponse {
    items:ContentItem[],
    totalCount:number,
}

export interface GenericListPageProps {
    fetchData: (options : {
        pagination:{startIdx:number , perPage : number}
    }) => Promise<PaginatedResponse>;
    pageTitle: string;
    basePath: string;
    errorMessage: string;
    contentType?: string;
    
}

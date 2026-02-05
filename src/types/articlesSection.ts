import { ArticlesCardProps } from "./ArticlesListPageProps";


export interface ArticlesSectionProps {
    title: string;
    viewAllButton: {
        text: string;
        href: string;
    };
    articles: ArticlesCardProps[];
    compact?: boolean;
}

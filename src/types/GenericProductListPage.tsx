import { ProductCardProps } from "./product";

export interface GenericListPageProps {
  fetchData: () => Promise<ProductCardProps[]>;
  pageTitle: string;
  basePath: string;
  errorMessage: string;
  contentType?: "articles";
}
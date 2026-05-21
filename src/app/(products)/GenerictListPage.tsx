
import { CONFIG } from "../../../config/config";
import ArticleSection from "../(articles)/ArticlesSection";
import { GenericListPageProps } from "@/src/types/GenerictListPage";
import ProductsSection from "./ProductsSection";
import PaginationWrapper from "@/src/components/PaginationWrapper";
import { ArticlesCardProps } from "@/src/types/ArticlesListPageProps";
import { ProductCardProps } from "@/src/types/product";
import ErrorComponent from "@/src/components/errorComponent/ErrorComponent";



const GenericListPage = async ({
  searchParams,
  props,
}: {
  searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
  props: GenericListPageProps;
}) => {
  const params = await searchParams;
  const page = params?.page;

  const defaultItemsPerPage =
    props.contentType === "category"
      ? CONFIG.ITEMS_PER_PAGE_CATEGORY
      : CONFIG.ITEMS_PER_PAGE;

  const itemsPerPage = params?.itemsPerPage || defaultItemsPerPage;

  const currentPage = Number(page) || 1;
  const perPage = Number(itemsPerPage);
  const startIdx = (currentPage - 1) * perPage;

  let items: any[] = [];
  let totalCount = 0;
  let totalPages = 0;

  try {
    const result = await props.fetchData({
      pagination: { startIdx, perPage },
    });
    items = result.items;
    totalCount = result.totalCount;
    totalPages = Math.ceil(totalCount / perPage);
  } catch (error) {
    return (
      <ErrorComponent
        error={error instanceof Error ? error : new Error(String(error))}
        userMessage="Не удалось получить элементы пагинации"
      />
    );
  }

  return (
    <>
      {!props.contentType || props.contentType === "category" ? (
        <ProductsSection
          title={props.pageTitle}
          products={items as ProductCardProps[]}
          contentType={props.contentType}
        />
      ) : (
        <ArticleSection
          title={props.pageTitle || ""}
          articles={items as ArticlesCardProps[]}
          viewAllButton={props.viewAllButton}
        />
      )}

      {totalPages > 1 && (
        <PaginationWrapper
          totalItems={totalCount}
          currentPage={currentPage}
          basePath={props.basePath}
          contentType={props.contentType}
        />
      )}
    </>
  );
};

export default GenericListPage;
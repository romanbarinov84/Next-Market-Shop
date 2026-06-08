import PaginationWrapper from "@/src/components/PaginationWrapper";
import { ArticleCardProps } from "@/src/types/articles";
import ArticleSection from "../(articles)/ArticlesSection";
import { ProductCardProps } from "@/src/types/product";
import ProductsSection from "./ProductsSection";
import ErrorComponent from "@/src/components/errorComponent/ErrorComponent";
import { GenericListPageProps } from "@/src/types/GenerictListPage";
import { CONFIG } from "@/config/config";

const GenericListPage = async ({
  searchParams,
  props,
}: {
  searchParams: { page?: string; itemsPerPage?: string };
  props: GenericListPageProps;
}) => {
  const page = searchParams?.page;

  const defaultItemsPerPage =
    props.contentType === "category"
      ? CONFIG.ITEMS_PER_PAGE_CATEGORY
      : CONFIG.ITEMS_PER_PAGE;

  const itemsPerPage =
    Number(searchParams?.itemsPerPage) || defaultItemsPerPage;

  const currentPage = Number(page) || 1;
  const perPage = itemsPerPage;

  const startIdx = (currentPage - 1) * perPage;

  let items = [];
  let totalCount = 0;

  try {
    const result = await props.fetchData({
      pagination: { startIdx, perPage },
    });

    items = result.items;
    totalCount = result.totalCount;
  } catch (error) {
    return (
      <ErrorComponent
        error={error instanceof Error ? error : new Error(String(error))}
        userMessage="Не удалось получить элементы"
      />
    );
  }

  const totalPages = perPage ? Math.ceil(totalCount / perPage) : 0;

  return (
    <>
      {!props.contentType || props.contentType === "category" ? (
        <ProductsSection
          title={props.pageTitle}
          products={items as ProductCardProps[]}
          applyIndexStyles={props.contentType !== "category"}
          contentType={props.contentType}
        />
      ) : (
        <ArticleSection
          title={props.pageTitle || ""}
          articles={items as ArticleCardProps[]}
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
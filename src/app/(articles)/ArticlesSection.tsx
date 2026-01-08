import ViewAllButton from "@/src/components/allButton/ViewAllButton";
import ArticleCard from "./Article/ArticleCard";
import { ArticlesSectionProps } from "@/src/types/articlesSection";

const ArticlesSection = ({
  title,
  viewAllButton,
  articles = [],
  compact = false,
}: ArticlesSectionProps) => {
  const sectionClasses = !compact ? "flex justify-center mb-20 mt-10 px-4 md:px-8" : "";

  return (
    <section className={sectionClasses}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between cursor-pointer">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-zinc-900 mb-8">
            {title}
          </h2>
          <ViewAllButton text={viewAllButton.text} href={viewAllButton.href} />
        </div>

        {/* Сетка карточек */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {articles.map((article, index) => {
            const liClass = compact
              ? [index >= 4 ? "hidden xl:hidden" : "", index >= 3 ? "md:hidden xl:block" : ""].join(" ")
              : "flex"; // добавляем flex, чтобы ArticleCard растягивался

            return (
              <li key={article._id} className={liClass}>
                <ArticleCard  {...article} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ArticlesSection;

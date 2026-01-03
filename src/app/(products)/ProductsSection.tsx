import ViewAllButton from '@/src/components/allButton/ViewAllButton';
import ProductCard from '@/src/components/ProductCard/ProductCard';
import { ProductsSectionProps } from '@/src/types/productsSection';

const ProductsSection = ({
  title,
  viewAllButton,
  products,
  compact = false,
}: ProductsSectionProps) => {

  const sectionClasses = !compact 
    ? "flex justify-center mb-20 mt-10 px-4 md:px-8" 
    : "";

  const containerClasses = [
    "flex flex-col justify-center xl:max-w-302",
    !compact && "w-full max-w-[1200px] bg-white/70 backdrop-blur-md rounded-2xl shadow-lg shadow-black/10 p-4 md:p-6 xl:p-8"
  ].filter(Boolean).join(" ");

  return (
    <section className={sectionClasses}>
      <div className={containerClasses}>
        <div className="mb-4 md:mb-8 xl:mb-10 flex justify-between items-center">
          <h2 className="text-2xl xl:text-4xl font-bold">{title}</h2>
          {viewAllButton && (
            <ViewAllButton
              text={viewAllButton.text}
              href={viewAllButton.href}
            />
          )}
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
          {products.slice(0, 4).map((item, index) => (
            <li
              key={item._id}
              className={index === 3 ? 'md:hidden xl:block' : ''}
            >
              <ProductCard {...item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProductsSection;

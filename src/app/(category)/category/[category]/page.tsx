import ErrorComponent from "@/src/components/errorComponent/ErrorComponent";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  let category: string = "";

  try {
    category = (await params).category;
  } catch (error) {
    return <ErrorComponent error={error instanceof Error ? error : new Error(String(error))}  userMessage='Ошибка получения категорий' />
  }
  return <div>Страница категории: {category}</div>;
};

export default CategoryPage;
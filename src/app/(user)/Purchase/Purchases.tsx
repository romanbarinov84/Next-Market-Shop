import { Loader } from "lucide-react";
import fetchPurchases from "../fetchPurchases";
import { Suspense } from "react";
import { getServerUserId } from "@/UTILS/getServerUserId";
import GenericListPage from "../../(products)/GenerictListPage";

const Purchases = async ({
  searchParams,
}: {
  searchParams: {
    page?: string;
    itemsPerPage?: string;
  };
}) => {
  const userId = await getServerUserId();

  if (!userId) {
    return <div className="text-xxl text-red-300"> Чтобы увидеть ваши покупки пожалуйста, авторизуйтесь</div>;
  }

  return (
    <Suspense fallback={<Loader />}>
      <GenericListPage
        searchParams={searchParams}
        props={{
          fetchData: ({ pagination: { startIdx, perPage } }) =>
            fetchPurchases({
              pagination: { startIdx, perPage },

            }),
          pageTitle: "Все покупки",
          basePath: "/purchases",
        }}
      />
    </Suspense>
  );
};

export default Purchases;
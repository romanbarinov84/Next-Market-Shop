
import { useEffect, useState } from "react";
import { ProductCardProps } from "../types/product";
import { Order } from "../types/order";

export const useOrderProductsData = (order: Order) => {
  const [productsData, setProductsData] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsData = async () => {
      const data = await Promise.all(
        order.items.map(async (item) => {
          const response = await fetch(`/api/products/${item.productId}`);
          return response.json();
        })
      );
      setProductsData(data);
      setLoading(false);
    };

    if (order.items.length > 0) {
      fetchProductsData();
    }
  }, [order.items]);

  return { productsData, loading };
};
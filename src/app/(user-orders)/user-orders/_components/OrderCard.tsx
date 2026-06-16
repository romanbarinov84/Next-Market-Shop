
import OrderHeader from "./OrderHeader";
import DeliveryDatePicker from "./DeliveryDatePicker";
import { useEffect, useState } from "react";
import OrderDetails from "./OrderDetails";
import { StockWarningsAlert } from "./StockWarningsAlert";
import { Order } from "@/src/types/order";
import { useOrderProducts } from "@/src/hooks/useOrderProducts";
import { useOrderProductsData } from "@/src/hooks/useOrderProductsData";
import { useOrderPricing } from "@/src/hooks/useOrderPricing";
import { usePriceComparison } from "@/src/hooks/usePriceComparison";
import useRepeatOrder from "@/src/hooks/useRepeatOrder";
import { useDeliveryData } from "@/src/hooks/useDeliveryData";
import MiniLoader from "@/src/components/MiniLoader";
import ProductsSection from "@/src/app/(products)/ProductsSection";
import OrderActions from "./OrderActions";
import { RepeatOrderSuccessAlert } from "./RepeatOrderSuccessAlert";
import { ProductsData } from "@/src/types/userOrder";
import RepeatOrderSection from "./RepeatOrderSection";


const OrderCard = ({ order }: { order: Order}) => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showPriceWarning, setShowPriceWarning] = useState(false);

  const { productsData: fetchedProductsData, loading: productsDataLoading } =
    useOrderProductsData(order);

  const { orderProducts, stockWarnings } = useOrderProducts(
    order,
    fetchedProductsData
  );

  const { currentProducts, priceComparison } = usePriceComparison(
    order,
    fetchedProductsData
  );

  const { cartItemsForSummary, productsData, customPricing } = useOrderPricing(
    order,
    currentProducts
  );

  const {
    showDatePicker,
    showDeliveryButton,
    handleOrderClick,
    handleDeliveryClick,
    handleDateSelect,
    handleCancelDelivery,
    isRepeatOrderCreated,
    selectedDelivery,
    handleEditDelivery,
    handleRepeatOrderSuccess,
  } = useRepeatOrder();

  const { deliverySchedule } = useDeliveryData();

  const hasStockIssues = orderProducts.some(
    (product) => product.isLowStock || product.insufficientStock
  );
  const canCreateRepeatOrder = !hasStockIssues;
  const applyIndexStyles = !showOrderDetails;

useEffect(() => {
  if (priceComparison?.hasChanges && !showPriceWarning) {
    const timer = setTimeout(() => {
      setShowPriceWarning(true);
    }, 0);
    return () => clearTimeout(timer);
  }
}, [priceComparison, showPriceWarning]);

  if (productsDataLoading) {
    return <MiniLoader />;
  }

  return (
    <div className="text-main-text">
      <OrderHeader
        order={order}
        showDeliveryButton={showDeliveryButton}
        onOrderClick={handleOrderClick}
        onDeliveryClick={handleDeliveryClick}
        disabled={hasStockIssues}
      />
      <ProductsSection
        products={orderProducts}
        applyIndexStyles={applyIndexStyles}
        isOrderPage={true}
      />
      <RepeatOrderSection
        isRepeatOrderCreated={isRepeatOrderCreated}
        selectedDelivery={selectedDelivery}
        canCreateRepeatOrder={canCreateRepeatOrder}
        order={order}
        priceComparison={priceComparison}
        showPriceWarning={showPriceWarning}
        onClosePriceWarning={() => setShowPriceWarning(false)}
        deliveryData={selectedDelivery}
        onEditDelivery={handleEditDelivery}
        productsData={productsData as unknown as ProductsData}
        cartItemsForSummary={cartItemsForSummary}
        customPricing={customPricing}
        onOrderSuccess={handleRepeatOrderSuccess}
      />
      <StockWarningsAlert
        warnings={stockWarnings}
        hasStockIssues={hasStockIssues}
      />
      {isRepeatOrderCreated && <RepeatOrderSuccessAlert/>}
      <OrderActions
        showOrderDetails={showOrderDetails}
        onToggleDetails={() => setShowOrderDetails(!showOrderDetails)}
      />
      {showOrderDetails && <OrderDetails order={order} />}
      {showDatePicker && (
        <DeliveryDatePicker
          schedule={deliverySchedule}
          isCreatingOrder={false}
          onDateSelect={(date, timeSlot) =>
            handleDateSelect(date, timeSlot, order.deliveryAddress)
          }
          onCancel={handleCancelDelivery}
        />
      )}
    </div>
  );
};

export default OrderCard;
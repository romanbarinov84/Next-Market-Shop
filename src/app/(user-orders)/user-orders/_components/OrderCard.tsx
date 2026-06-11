import { useDeliveryData } from "@/src/hooks/useDeliveryData";
import { useOrderProducts } from "@/src/hooks/useOrderProducts";
import useRepeatOrder from "@/src/hooks/useRepeatOrder";
import { Order } from "@/src/types/order";
import OrderHeader from "./OrderHeader";
import DeliveryDatePicker from "./DeliveryDatePicker";
import ProductsSection from "@/src/app/(products)/ProductsSection";
import { useState } from "react";
import OrderActions from "./OrderActions";
import MiniLoader from "@/src/components/MiniLoader";
import OrderDetails from "./OrderDetails";


const OrderCard = ({ order }: { order: Order }) => {
  const [showOrderDetails , setShowOrderDetails] = useState(false);
  const {
    showDatePicker,
    showDeliveryButton,
    handleOrderClick,
    handleDeliveryClick,
    handleDateSelect,
    handleCancelDelivery
  } = useRepeatOrder();
  const {
    orderProducts,
    loading: productsLoading,
    stockWarnings,
  } = useOrderProducts(order);

  const { deliverySchedule } = useDeliveryData();


  const onToggleDetails = () => {
    setShowOrderDetails(!showOrderDetails)
  }

  const applyIndexStyles = !showOrderDetails;

  if(productsLoading){
    return <MiniLoader/>
  }

  return (
    <div className="text-main-text">
      <OrderHeader
        order={order}
        showDeliveryButton={showDeliveryButton}
        onOrderClick={handleOrderClick}
        onDeliveryClick={handleDeliveryClick}
      />
      
      <ProductsSection products={orderProducts} applyIndexStyles={applyIndexStyles}/>
      <OrderActions showOrderDetails={showOrderDetails} onToggleDetails={onToggleDetails}/>
      {showOrderDetails && <OrderDetails order={order}/>}
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
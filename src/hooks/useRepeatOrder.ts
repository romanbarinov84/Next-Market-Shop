
import { useState } from "react";
import { DeliveryAddress } from "../types/order";
import { DeliveryData } from "../types/cart";

const useRepeatOrder = () => {
  const [showDeliveryButton, setShowDeliveryButton] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryData | null>(
    null
  );

  const handleOrderClick = () => setShowDeliveryButton(true);
  const handleDeliveryClick = () => setShowDatePicker(true);

  const handleDateSelect = (
    date: Date,
    timeSlot: string,
    address: DeliveryAddress
  ) => {
    const deliveryData: DeliveryData = {
      address,
      time: { date: date.toISOString().split("T")[0], timeSlot },
    };
    setSelectedDelivery(deliveryData);
    setShowDatePicker(false);
  };

  const handleCancelDelivery = () => {
    setShowDatePicker(false);
    setSelectedDelivery(null);
    setShowDeliveryButton(false);
  };

  return {
    showDatePicker,
    showDeliveryButton,
    handleOrderClick,
    handleDeliveryClick,
    handleDateSelect,
    selectedDelivery,
    handleCancelDelivery,
  };
};

export default useRepeatOrder;
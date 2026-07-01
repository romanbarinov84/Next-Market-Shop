import Image from "next/image";
import AdminOrderCard from "./AdminOrderCard";
import { useState, useMemo } from "react";
import CityFilterButtons from "./CityFilterButtons";
import { getUniqueCities } from "../utils/getUniqueCities";
import { useGetAdminOrdersQuery } from "@/src/store/redux/api/ordersApi";
import { Order } from "@/src/types/order";

interface TimeSlotGroupProps {
  timeSlot: string;
  orderIds: string[];
}

const TimeSlotGroup = ({ timeSlot, orderIds }: TimeSlotGroupProps) => {
  const { data } = useGetAdminOrdersQuery();

  const [selectedCity, setSelectedCity] = useState("Все города");

  
const orders = data?.orders ?? [];
  // 1. фильтруем заказы по ID
const localOrders = useMemo(() => {
  return orders.filter((order) =>
    orderIds.includes(order._id)
  );
}, [orders, orderIds]);

  // 2. список городов
  const cities = useMemo(() => {
    return getUniqueCities(localOrders);
  }, [localOrders]);

  // 3. фильтр по городу
  const filteredSlotOrders = useMemo(() => {
    if (selectedCity === "Все города") return localOrders;

    return localOrders.filter(
      (order) => order.deliveryAddress?.city === selectedCity
    );
  }, [localOrders, selectedCity]);

  // 4. время слота
  const startTime = useMemo(() => {
    return timeSlot.split("-")[0];
  }, [timeSlot]);

  // 5. количество завершённых
  const completedOrdersCount = useMemo(() => {
    return filteredSlotOrders.filter(
      (order) => order.status === "confirmed"
    ).length;
  }, [filteredSlotOrders]);

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between text-xl md:text-2xl xl:text-4xl text-main-text">
        <div className="flex gap-x-4 mb-4">
          <Image
            alt={timeSlot}
            src="/icons-orders/icon-clock.svg"
            width={24}
            height={24}
          />
          <span className="font-bold">{startTime}</span>
        </div>

        <div className="flex gap-x-2.5 items-center">
          <Image
            alt={timeSlot}
            src="/icons-orders/icon-check.svg"
            width={24}
            height={24}
          />
          <div>
            <span className="text-2xl">{completedOrdersCount}</span>
            <span className="text-xl"> / </span>
            <span className="text-2xl">{filteredSlotOrders.length}</span>
          </div>
        </div>
      </div>

      {/* CITY FILTER */}
      {cities.length > 1 && (
        <CityFilterButtons
          cities={cities}
          slotOrders={localOrders}
          selectedCity={selectedCity}
          onCitySelect={setSelectedCity}
        />
      )}

      {/* ORDERS */}
      <div className="flex flex-col gap-y-15">
        {filteredSlotOrders.map((order) => (
          <AdminOrderCard
            key={order._id}
            orderId={order._id}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeSlotGroup;
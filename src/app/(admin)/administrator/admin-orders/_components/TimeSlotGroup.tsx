import { Order } from "@/src/types/order";
import Image from "next/image";
import { useState } from "react";
import { getUniqueCities } from "../utils/getUniqueCities";



interface TimeSlotGroupProps {
  timeSlot: string;
  slotOrders: Order[];
}

const TimeSlotGroup = ({ timeSlot, slotOrders }: TimeSlotGroupProps) => {
  const [selectedCity , setSelectedCity] = useState<string>("Все города");

 const cities =  getUniqueCities(slotOrders);

  const startTime = timeSlot.split("-")[0];

  return (
    <div key={timeSlot}>
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
      </div>
    </div>
  );
};

export default TimeSlotGroup;
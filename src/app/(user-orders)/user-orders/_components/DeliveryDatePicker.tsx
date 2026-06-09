"use client";

import { useEffect, useMemo, useState } from "react";

import { getAvailableDates } from "./utils/getAvailableDates";
import { getAvailableTimeSlots } from "./utils/getAvailableTimeSlots";
import { formatDisplayDate } from "./utils/formatDisplayDate";

import { Schedule } from "@/src/types/deliverySchedule";
import { formatDateFull, formatDateNumeric } from "./utils/dateFormatters";
import { formatTimeSlot } from "@/src/app/(cart)/cart/utils/formatTimeSlot";

import MiniLoader from "@/src/components/MiniLoader";

interface DeliveryDatePickerProps {
  schedule: Schedule;
  isCreatingOrder: boolean;
  onDateSelect: (date: Date, timeSlot: string) => void;
  onCancel: () => void;
}

const DeliveryDatePicker: React.FC<DeliveryDatePickerProps> = ({
  schedule,
  isCreatingOrder,
  onDateSelect,
  onCancel,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const availableDates = useMemo(() => {
    return getAvailableDates(schedule);
  }, [schedule]);

  useEffect(() => {
    if (
      availableDates.length > 0 &&
      (!selectedDate ||
        !availableDates.some(
          (item) =>
            item.date.toDateString() === selectedDate.toDateString()
        ))
    ) {
      setSelectedDate(availableDates[0].date);
    }
  }, [availableDates, selectedDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    if (selectedDate) {
      onDateSelect(selectedDate, timeSlot);
    }
  };

  const formatDateToString = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const availableTimeSlots = useMemo(() => {
    if (!selectedDate) return [];

    return getAvailableTimeSlots(selectedDate, schedule);
  }, [selectedDate, schedule]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
      <div className="mx-4 w-full max-w-md rounded bg-white p-6">
        <h3 className="mb-4 text-lg font-bold">
          Выберите дату и время доставки
        </h3>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Дата доставки:
          </label>

          <div className="grid grid-cols-3 gap-2">
            {availableDates.map((item) => {
              const isSelected =
                selectedDate?.toDateString() === item.date.toDateString();

              return (
                <button
                  key={item.dateString}
                  type="button"
                  onClick={() => handleDateSelect(item.date)}
                  className={`cursor-pointer rounded px-3 py-2 text-sm duration-300 ${
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <div
                    className={`mt-1 text-xs ${
                      isSelected ? "text-white" : "text-main-text"
                    }`}
                  >
                    {formatDateNumeric(formatDateToString(item.date))}
                  </div>

                  <div
                    className={`hidden text-xs xs:block ${
                      isSelected ? "text-white" : "text-main-text"
                    }`}
                  >
                    {formatDateFull(formatDateToString(item.date))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {selectedDate && (
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Доступное время доставки для{" "}
              {formatDisplayDate(selectedDate)}:
            </label>

            <div className="grid grid-cols-2 gap-2">
              {availableTimeSlots.map((slot) => {
                const formatted = formatTimeSlot(slot);

                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => handleTimeSlotSelect(slot)}
                    disabled={isCreatingOrder}
                    className="cursor-pointer rounded bg-gray-100 px-3 py-2 text-sm duration-300 hover:bg-primary hover:text-white disabled:opacity-50"
                  >
                    <span className="xl:hidden">
                      {formatted.mobileLabel}
                    </span>

                    <span className="hidden xl:block">
                      {formatted.desktopLabel}
                    </span>
                  </button>
                );
              })}

              {availableTimeSlots.length === 0 && (
                <p className="col-span-2 py-2 text-center text-gray-500">
                  Нет доступных временных интервалов
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isCreatingOrder}
            className="flex-1 cursor-pointer rounded bg-gray-300 py-2 text-gray-700 duration-300 hover:bg-gray-400 hover:text-white"
          >
            Отмена
          </button>
        </div>

        {isCreatingOrder && (
          <div className="mt-4 text-center">
            <MiniLoader />
            <p className="text-sm text-gray-600">
              Создаем заказ...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryDatePicker;
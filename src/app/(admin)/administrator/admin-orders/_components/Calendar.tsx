
import { ru } from "date-fns/locale";
import "react-day-picker/style.css";
import "../daypicker.css";
import Image from "next/image";
import { DayPicker } from "react-day-picker";

interface CalendarProps {
  customDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  onMonthChange: (date: Date | undefined) => void;
}

const Calendar = ({ customDate, onDateSelect, onMonthChange }: CalendarProps) => {
  const getMonthName = (date: Date) => {
    const monthName = date.toLocaleDateString("ru-RU", {
      month: "long",
    });
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    const year = date.getFullYear();
    return `${capitalizedMonth} ${year}`;
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(customDate || new Date());
    newDate.setMonth(newDate.getMonth() - 1);
    onMonthChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(customDate || new Date());
    newDate.setMonth(newDate.getMonth() + 1);
    onMonthChange(newDate);
  };

  return (
    <div className="absolute top-17 left-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80">
      {/* Кастомная навигация */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold text-main-text">
          {customDate ? getMonthName(customDate) : "Выберите дату"}
        </span>
        <div className="flex gap-x-4 justify-center">
          <button
            onClick={handlePreviousMonth}
            className="p-2 bg-[#f3f2f1] hover:bg-primary rounded duration-300 cursor-pointer"
          >
            <Image
              src="/iconarrowright.png"
              width={24}
              height={24}
              alt="Предыдущий месяц"
              className="rotate-180"
            />
          </button>

          <button
            onClick={handleNextMonth}
            className="p-2 bg-[#f3f2f1] hover:bg-primary rounded duration-300 cursor-pointer"
          >
            <Image
              src="/iconarrowright.png"
              width={24}
              height={24}
              alt="Следующий месяц"
            />
          </button>
        </div>
      </div>

   <DayPicker
  mode="single"
  selected={customDate}
  onSelect={onDateSelect}
  locale={ru}
  showOutsideDays
  className="p-0"
  classNames={{
    months: "w-full",
    month: "w-full",

    nav: "hidden",

    month_caption: "flex justify-between items-center mb-4",
    caption_label: "text-lg font-bold text-main-text",

    weekdays: "flex border-b",
    weekday: "w-10 text-center text-sm font-normal text-gray-500 py-2",

    week: "flex w-full mt-1",

    day: "w-10 h-10 flex items-center justify-center rounded-full text-[#606060] hover:text-white hover:bg-[#ff6633] transition cursor-pointer",
  }}
  modifiersClassNames={{
    selected: "bg-[#ff6633] text-white",
    today: "bg-gray-100 text-[#ff6633] font-bold",
    outside: "text-gray-400 opacity-50",
  }}
/>
    </div>
  );
};

export default Calendar;
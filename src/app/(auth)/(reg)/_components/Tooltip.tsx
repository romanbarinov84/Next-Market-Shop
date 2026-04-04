"use client";

import Image from "next/image";

const Tooltip = ({
  text,
  position = "bottom",
}: {
  text: string;
  position?: "top" | "bottom";
}) => {
  const isTop = position === "top";

  return (
    <div
      className={`
        absolute left-1/2 -translate-x-1/2 z-50
        ${isTop ? "bottom-full mb-2" : "top-full mt-2"}
      `}
    >
      <div
        className="
          relative bg-[#d80000] text-white text-sm px-3 py-2
          rounded-lg shadow-lg flex items-center gap-2
          animate-fadeIn
        "
      >
        <Image
          src="/ALERTiCON.png"
          alt="alert"
          width={18}
          height={18}
        />

        <span className="text-sm">{text}</span>

        {/* стрелка */}
        <div
          className={`
            absolute left-1/2 -translate-x-1/2 w-0 h-0
            border-l-[6px] border-r-[6px] border-transparent
            ${
              isTop
                ? "top-full border-t-[6px] border-t-[#d80000]"
                : "bottom-full border-b-[6px] border-b-[#d80000]"
            }
          `}
        />
      </div>
    </div>
  );
};

export default Tooltip;
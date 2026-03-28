"use client";


import { useRouter } from "next/navigation";

const CloseButton = () => {
  const router = useRouter();

  const handleClose = () => {
    router.replace("/");
  };
  return (
    <button
      onClick={handleClose}
      className="bg-[#f3f2f1] p-2 rounded duration-300 cursor-pointer mb-8 absolute top-0 right-0"
      aria-label="Закрыть"
    >
     X
    </button>
  );
};

export default CloseButton;
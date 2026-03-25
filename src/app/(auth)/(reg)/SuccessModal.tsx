"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";


const SuccessModal = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();


  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    },3000)
    return () => clearTimeout(timer)
  },[router])
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      
      {/* Modal */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md transform transition-all scale-100 animate-fadeIn">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-2">
          Успешно!
        </h2>

        {/* Text */}
        <p className="text-gray-600 text-center mb-6">
          Вы успешно зарегистрировались 🎉
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl transition duration-200"
        >
          ОК
        </button>
      </div>

      {/* Animation */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessModal;
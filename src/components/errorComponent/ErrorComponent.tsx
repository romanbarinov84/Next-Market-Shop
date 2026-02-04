"use client"

import { ErrorProps } from "@/src/types/errorProps"


const ErrorComponent = ({ error, userMessage }: ErrorProps) => {
    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-red-50">
        <div className="bg-white border border-red-300 rounded-xl shadow-md p-6 max-w-md w-full text-center">
            <p className="text-red-700 text-lg sm:text-xl mb-6">
                {userMessage ||` Произошла ошибка ${error}. Пожалуйста, попробуйте позже.`}
            </p>
            <button
                onClick={() => window.location.reload()}
                className="bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors w-full sm:w-auto"
            >
                Попробовать снова
            </button>
        </div>
    </div>
  )
}

export default ErrorComponent

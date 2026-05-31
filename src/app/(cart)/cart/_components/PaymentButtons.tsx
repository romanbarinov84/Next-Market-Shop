import { buttonStyles } from "@/src/app/(auth)/styles";
import OrderSuccessMessage from "./OrderSuccessMessage";

interface PaymentButtonsProps {
    isOrdered: boolean;
    paymentType: 'cash' | 'online' | null;
    orderNumber: string | null;
    isProcessing: boolean;
    canProceedWidthPayment: boolean;
    onOnlinePayment: () => void;
    onCashPayment: () => Promise<void>;
}

const PaymentButtons = ({
    isOrdered,
    paymentType,
    orderNumber,
    isProcessing,
    canProceedWidthPayment,
    onOnlinePayment,
    onCashPayment,
}: PaymentButtonsProps) => {
    if(isOrdered && paymentType === "cash"){
        return <OrderSuccessMessage orderNumber={orderNumber} />
    }

    if(isOrdered) return null;
    return (
        <div className="flex flex-col gap-3">
            <button
                disabled={!canProceedWidthPayment}
                onClick={onOnlinePayment}
                className={`rounded w-full text-xl h-15 items-center justify-center ${
                    canProceedWidthPayment
                        ? buttonStyles.active
                        : buttonStyles.inactive
                }`}
            >
                {isProcessing ? 'Обработка...' : 'Оплатить на сайте'}
            </button>

            <button
                disabled={!canProceedWidthPayment}
                onClick={onCashPayment}
                className={`h-10 rounded w-full text-base items-center justify-center duration-300 ${
                    canProceedWidthPayment
                        ? 'bg-primary hover:shadow-button-default active:shadow-button-active text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
                {isProcessing ? 'Оформление...' : 'Оплатить при получении'}
            </button>
        </div>
    );
};

export default PaymentButtons;

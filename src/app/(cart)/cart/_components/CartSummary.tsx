import { CartSummaryProps } from '../../../../types/cart';
import { CONFIG } from '../../../../../config/config';
import { useState } from 'react';
import { useCartStore } from '@/src/store/cartStore';
import { calculateFinalPrice, calculatePriceByCard } from '@/UTILS/calcPrices';
import { CartItemWithPrice } from '@/src/types/order';
import { createOrderAction } from '@/src/actions/orderDelivery';
import PriceSummary from './PriceSummary';
import MinimumOrderWarning from './MinimumOrderWarning';
import CheckOutButton from './CheckOutButton';
import PaymentButtons from './PaymentButtons';
import { FakePaymentData } from '@/src/types/payment';

const CartSummary = ({ deliveryData, productsData = {} }: CartSummaryProps) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderNumber, setOrderNumber] = useState<string | null>(null);
    const [paymentType, setPaymentType] = useState<'cash' | 'online' | null>(
        null,
    ); //тип платежа
    const [showPaymentModal, setShowPaymentModal] = useState(false); //модальное окно для данных
    const [showSuccessModal, setShowSuccessModal] = useState(false); // модальное окно для результата
    const {
        pricing,
        cartItems,
        hasLoyaltyCard,
        isCheckout,
        setIsCheckout,
        isOrdered,
        setIsOrdered,
        useBonuses
    } = useCartStore();

  

    const visibleCartItems = cartItems.filter((item) => item.quantity > 0);
    

    const {
        totalPrice,
        totalMaxPrice,
        totalDiscount,
        finalPrice,
        totalBonuses,
        maxBonusUse,
        isMinimumReached,
    } = pricing;

    const usedBonuses = Math.min(
        maxBonusUse,
        Math.floor((totalPrice * CONFIG.MAX_BONUSES_PERCENT) / 100),
    );

    const actualUsedBonuses = useBonuses ? usedBonuses : 0;

    const handleOrderCreation = async(paymentMethod : "cash_on_delivery" | "online",paymentData?:FakePaymentData) => {

    }

    const handleCashPayment = async () => {
        if (!deliveryData) {
            console.error('Данные доставки не заполнены');
            return;
        }

        setIsProcessing(true);

        try {
            const cartItemsWithPrices: CartItemWithPrice[] =
                visibleCartItems.map((item) => {
                    const product = productsData[item.productId];

                    if (!product) {
                        return {
                            productId: item.productId,
                            quantity: item.quantity,
                            price: 0,
                        };
                    }

                    const priceWithDiscount = calculateFinalPrice(
                        product.basePrice,
                        product.discountPercent || 0,
                    );

                    const finalPrice = hasLoyaltyCard
                        ? calculatePriceByCard(
                              priceWithDiscount,
                              CONFIG.CARD_DISCOUNT_PERCENT,
                          )
                        : priceWithDiscount;

                    return {
                        productId: item.productId,
                        quantity: item.quantity,
                        price: finalPrice,
                        basePrice: product.basePrice,
                        discountPercent: product.discountPercent || 0,
                        hasLoyaltyDiscount: hasLoyaltyCard,
                    };
                });

            const result = await createOrderAction({
                finalPrice,
                totalBonuses,
                usedBonuses,
                totalDiscount,
                deliveryAddress: deliveryData.address,
                deliveryTime: deliveryData.time,
                cartItems: cartItemsWithPrices,
                totalPrice: totalMaxPrice,
                paymentMethod: 'cash_on_delivery',
            });

            setOrderNumber(result.orderNumber);
            setIsOrdered(true);
        } catch (error: unknown) {
            console.error('Ошибка при создании заказа:', error);
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Произошла неизвестная ошибка';
            alert(`Ошибка при оформлении заказа: ${errorMessage}`);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleOnlinePayment = () => {
        if (!deliveryData) {
            console.error('Данные доставки не заполнены');
            return;
        }
        console.log('Оплата на сайте');
    };

    const isFormValid = (): boolean => {
        if (!deliveryData) {
            return false;
        }

        const { address, time } = deliveryData;

        // Проверяем обязательные поля адреса
        const isAddressValid = Boolean(
            address.city?.trim() &&
            address.street?.trim() &&
            address.house?.trim(),
        );

        // Проверяем время доставки
        const isTimeValid = Boolean(time.date?.trim() && time.timeSlot?.trim());

        // Используем отфильтрованные товары
        const isValidForm =
            isAddressValid &&
            isTimeValid &&
            isMinimumReached &&
            visibleCartItems.length > 0;

        return isValidForm;
    };

    const canProceedWithPayment = (): boolean => {
        return isFormValid() && !isProcessing;
    };

    return (
        <>
            <PriceSummary
                visibleCartItems={visibleCartItems}
                totalMaxPrice={totalMaxPrice}
                totalDiscount={totalDiscount}
                finalPrice={finalPrice}
                totalBonuses={totalBonuses}
            />

            <div className="w-full">
                <MinimumOrderWarning isMinimumReached={isMinimumReached} />

                {!isCheckout ? (
                    <CheckOutButton
                        isCheckout={isCheckout}
                        isMinimumReached={isMinimumReached}
                        visibleCartItemsCount={visibleCartItems.length}
                        onCheckout={() => setIsCheckout(true)}
                    />
                ) : (
                    <PaymentButtons
                        isOrdered={isOrdered}
                        paymentType={paymentType}
                        orderNumber={orderNumber}
                        isProcessing={isProcessing}
                        canProceedWidthPayment={canProceedWithPayment()}
                        onOnlinePayment={handleOnlinePayment}
                        onCashPayment={handleCashPayment}
                    />
                )}
            </div>
        </>
    );
};

export default CartSummary;

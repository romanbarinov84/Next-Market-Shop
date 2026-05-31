
import { buttonStyles } from '@/src/app/(auth)/styles'
import React from 'react'


interface CheckOutButtonProps {
    isCheckout:boolean;
    isMinimumReached:boolean;
    visibleCartItemsCount:number;
    onCheckout:()=> void;

}

const CheckOutButton = ({isCheckout,isMinimumReached,visibleCartItemsCount,onCheckout}:CheckOutButtonProps) => {
    if(isCheckout) return null
  return (
    <>

         <button
              onClick={onCheckout}
              disabled={!isMinimumReached || visibleCartItemsCount === 0}
              className={`p-3 rounded mx-auto w-full text-2xl cursor-pointer ${
                isMinimumReached && visibleCartItemsCount > 0
                  ? buttonStyles.active
                  : buttonStyles.inactive
              }`}
            >
              Оформить заказ
            </button>
    </>
  )
}

export default CheckOutButton
"use client"

import  { useState } from 'react';
import { addToCartAction } from '../actions/AddToCartActions';
import CartActionMessage from './CartActionMessage';
import { useCartStore } from '../store/cartStore';

const AddToCartButton = ({ productId }: { productId: string }) => {

    const [isLoading , setIsLoading] = useState(false);
    const [message , setMessage] = useState<{
        success:boolean;
        message:string;
    }| null> (null);
  

     const { fetchCart } = useCartStore();

    const handleSubmit = async() => {
        setIsLoading(true);
        setMessage(null);

        try {
            const result = await addToCartAction(productId)
            setMessage(result);
            if (result.success) {
        await fetchCart();
      }
        } catch  {
            setMessage({
                success:false,
                message:"Ошибка при добавлении в корзину",
            })
        }finally{
            setIsLoading(false)
        }
    };

    return (
        <div className="relative">
            <form action={handleSubmit} >
                <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-2 text-sm sm:text-base text-orange-500 border border-orange-500 rounded hover:bg-orange-500 hover:text-white transition-colors duration-300 mt-auto">
                    До кошика
                </button>
            </form>
            {message && (<CartActionMessage message={message} onClose={() => setMessage(null)}/>)}
        </div>
    );
};

export default AddToCartButton;

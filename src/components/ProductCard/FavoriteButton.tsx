"use client";

import { useAuthStore } from '@/src/store/authStore';
import IconHeart from '../svg/iconHeart';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFavorites } from '@/src/hooks/useFavorite';

const FavoriteButton = ({ productId }: { productId: string }) => {
    const { isAuth } = useAuthStore();
    const [isProcessing, setIsProcessing] = useState(false);
    const {toggleFavorite , isFavorite , isLoading} = useFavorites();
    const router = useRouter();

    const handleClick = async () => {
        if (!isAuth) {
            router.push('/login');
            return;
        }

        setIsProcessing(true);
        try {
            await toggleFavorite(productId);
        } catch (error) {
            console.error('Не удалось переключить избранное', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const isActive = isAuth && isFavorite(productId);
    const disabled = isLoading || isProcessing;

    return (
        <>
            <button
                onClick={handleClick}
                disabled={disabled}
                className="absolute flex justify-center items-center top-2 right-2 z-10 w-8 h-8 p-2 bg-[#f3f2f1] hover:bg-[#ff8833] opacity-50 rounded cursor-pointer transition-all duration-300"
            >
                <IconHeart isActive={isActive} />
            </button>
        </>
    );
};

export default FavoriteButton;

'use client';

import { CatalogProps } from '@/src/types/catalog';
import { useEffect, useState } from 'react';
import GridCategoryBlock from '../GridCategoryBlock';

const CatalogPage = () => {
    const [categories, setCategories] = useState<CatalogProps[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [draggableCategory, setDraggableCategory] =
        useState<CatalogProps | null>(null);
    const [err, setErr] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const isAdmin = true;
const fetchCategories = async () => {
    setIsLoading(true);
    try {
        const response = await fetch('api/catalog');
        if (!response.ok) {
            throw new Error(`Ошибка сервера : ${response.status}`);
        }
        const data: CatalogProps[] = await response.json();

        setCategories(data.sort((a, b) => a.order - b.order));
    } catch (error) {
        console.error(`Неудалось получить категории:`, error);
        setErr('Неудалось загрузить категории');
    } finally {
        setIsLoading(false);
    }
};

    useEffect(() => {
        fetchCategories();
    }, []);

    if (isLoading) {
        return <div className="text-center py-8">Загрузка каталога...</div>;
    }

    if (err) {
        return (
            <div className="text-center py-8 text-red-400">
                Ошибка загрузки каталога {err}
            </div>
        );
    }

    if (!categories.length) {
        return (
            <div className="text-center text-orange-600">
                Категорий каталога не найденно
            </div>
        );
    }

    const handleToggleEditing = async () => {
        setIsEditing(!isEditing);
    };

    const resetLayOut = () => {
        fetchCategories();
    };

    const handleDragStart = (category: CatalogProps) => {
        if (isEditing) {
            setDraggableCategory(category);
        }
    };

    const handleDragOver = (e:React.DragEvent , categoryId:string) => {
        e.preventDefault();
        if(draggableCategory && draggableCategory._id !== categoryId){
            
        }
    }

    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-[max(12px,calc((100%-1208px)/2))]  flex flex-col justify-center  py-10">
            {isAdmin && (
                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
                    {/* Edit / Update */}
                    <button
                        onClick={handleToggleEditing}
                        className="
        flex items-center justify-center
        h-10
        w-full sm:w-1/4

        rounded-lg
        px-4
        font-medium

        border border-(--color-primary)
        text-(--color-primary)

        transition-all duration-300
        cursor-pointer select-none

        hover:bg-orange-300
        hover:text-white
        hover:border-transparent

        active:scale-95
        active:shadow-(--shadow-button-active)
      "
                    >
                        {isEditing ? 'Оновити' : 'Змінити'}
                    </button>

                    {/* Reset */}
                    {isEditing && (
                        <button
                            onClick={resetLayOut}
                            className="
          relative overflow-hidden
          flex items-center justify-center

          h-10
          w-full sm:w-1/4
          px-4

          rounded-lg
          font-semibold
          text-white

          bg-linear-to-r from-orange-400 via-orange-500 to-orange-600
          shadow-md

          transition-all duration-300
          hover:shadow-lg
          hover:brightness-110

          active:scale-95
          active:shadow-inner

          focus:outline-none
          focus:ring-2
          focus:ring-orange-400
        "
                        >
                            Скинути
                        </button>
                    )}
                </div>
            )}

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 xl:mb-10 flex flex-row xl:text-15">
                Каталог
            </h1>
            <div className="w-full  bg-white/70 backdrop-blur-md rounded-2xl shadow-lg shadow-black/10 p-4 md:p-6 xl:p-8">
                <div
                    className="grid grid-cols-2  md:grid-cols-3 xl:grid-cols-4 gap-4 
            md:gap-6 xl:gap-8"
                >
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className={`${category.mobileColSpan} ${category.tabletColSpan} ${category.colSpan} bg-gray-200 rounded overflow-hidden min-h-50 h-full   ${isEditing ? "border-3 border-dashed border-gray-300" : ""}`}
                            onDragOver={(e) => handleDragOver(e , category._id)}
                        >
                            <div
                                className={`h-full w-full  ${
                                    draggableCategory?._id === category._id
                                        ? 'opacity-50'
                                        : ''
                                }`}
                                draggable={isEditing}
                                onDragStart={() => handleDragStart(category)}
                            >
                                <GridCategoryBlock
                                    id={category.id}
                                    title={category.title}
                                    img={category.img}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CatalogPage;

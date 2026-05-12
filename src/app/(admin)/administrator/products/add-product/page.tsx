'use client';
import { initialProductData } from '@/src/constance/AddProductFormData';
import { AddProductFormData } from '@/src/types/addProductTypes';
import { ArrowRightLeft } from 'lucide-react';
import Link from 'next/link';
import React, { ChangeEvent, useCallback, useState } from 'react';
import Title from './_components/Title';
import Article from './_components/Article';

const AddProductPage = () => {
    const [formData, setFormData] =
        useState<AddProductFormData>(initialProductData);
    const [upLoading, setUpLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [createdProductId, setCreatedProductId] = useState<number | null>(
        null,
    );

    const generateProductId = useCallback(() => {
        return Math.floor(Math.random() * 1000000000000000);
    }, []);

    const handleSubmit = async () => {};

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === 'checkbox'
                    ? (e.target as HTMLInputElement).checked
                    : value,
        }));
    };

    return (
        <div className="container flex flex-col items-center px-4 py-8 text-main-text mx-auto">
            <Link
                href="/administrator"
                className="hover:underline mb-3 lg:mb-4 flex flex-row items-center gap-3 text-sm lg:text-base"
            >
                <ArrowRightLeft className="h-5 w-7 ml-1" />
            </Link>
            <h1 className="text-3xl font-bold mb-8">Додати товар</h1>
            <form
                onSubmit={handleSubmit}
                className="max-w-2xl space-y-6 w-full"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Title
                        onChangeAction={handleInputChange}
                        title={formData.title}
                    />
                      <Article
            onChangeAction={handleInputChange}
            article={formData.article}
          />
                </div>
            </form>
        </div>
    );
};

export default AddProductPage;

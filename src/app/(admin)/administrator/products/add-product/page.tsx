'use client';
import { initialProductData } from '@/src/constance/AddProductFormData';
import { AddProductFormData } from '@/src/types/addProductTypes';
import { ArrowRightLeft } from 'lucide-react';
import Link from 'next/link';
import React, { ChangeEvent, useCallback, useState } from 'react';
import Title from './_components/Title';
import Article from './_components/Article';
import Description from './_components/Description';
import BasePrice from './_components/Baseprice';
import Quantity from './_components/Quantity';
import Discount from './_components/Discount';
import Brand from './_components/Brand';
import Manufacturer from './_components/Manufacturer';
import Weight from './_components/Weight';
import Categories from './_components/Categories';
import Tags from './_components/Tags';
import CheckboxGroup from './_components/CheckboxGroup';

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

    const hasActionsTag = formData.tags.includes("actions");

    const handleTagsChange = (tags: string[]) => {
    setFormData((prev) => ({ ...prev, tags }));
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
                <Description
          onChangeAction={handleInputChange}
          description={formData.description}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <BasePrice
            onChangeAction={handleInputChange}
            basePrice={formData.basePrice}
          />
           <Discount
            onChangeAction={handleInputChange}
            discount={formData.discountPercent}
            required={hasActionsTag}
          />
          <Quantity
            onChangeAction={handleInputChange}
            quantity={formData.quantity}
          />
        </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Weight onChangeAction={handleInputChange} weight={formData.weight} />
          <Brand onChangeAction={handleInputChange} brand={formData.brand} />
          <Manufacturer
            onChangeAction={handleInputChange}
            manufacturer={formData.manufacturer}
          />
        </div>
           <Categories
          selectedCategories={formData.categories}
          onCategoriesChange={(categories) =>
            setFormData((prev) => ({ ...prev, categories }))
          }
        />
        <Tags
          selectedTags={formData.tags}
          onTagsChange={handleTagsChange}
          hasActionsTag={hasActionsTag}
        />
        <CheckboxGroup
          items={[
            {
              name: "isHealthyFood",
              label: "Здоровая еда",
              checked: formData.isHealthyFood,
            },
            { name: "isNonGMO", label: "Без ГМО", checked: formData.isNonGMO },
          ]}
          onChange={handleInputChange}
        />
            </form>
        </div>
    );
};

export default AddProductPage;

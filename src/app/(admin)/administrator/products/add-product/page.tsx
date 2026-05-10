"use client"
import { initialProductData } from '@/src/constance/AddProductFormData';
import { AddProductFormData } from '@/src/types/addProductTypes'
import { ArrowRightLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useCallback, useState } from 'react'


const AddProductPage = () => {
  const [formData , setFormData] = useState<AddProductFormData>(initialProductData);
  const [upLoading , setUpLoading] = useState(false);
  const [loading , setLoading] = useState(false);
  const [image , setImage] = useState<File | null>(null);
  const [createdProductId , setCreatedProductId] = useState<number | null>(null);
   
  const generateProductId = useCallback(() => {
    return Math.floor(Math.random() * 1000000000000000)
  },[]);


  const handleSubmit = () => {

  }


  return (
    <div className='container flex flex-col items-center px-4 py-8 text-main-text mx-auto'>
      <Link href="/administrator" className='hover:underline mb-3 lg:mb-4 flex flex-row items-center gap-3 text-sm lg:text-base'>
      <ArrowRightLeft className='h-5 w-7 ml-1'/>
      </Link>
      <h1 className='text-3xl font-bold mb-8'>Додати товар</h1>
      <form onSubmit={handleSubmit} className='max-w-2xl space-y-6 w-full'>

      </form>
    </div>
  )
}

export default AddProductPage

import { AddProductFormData } from '@/src/types/addProductTypes'
import React, { useState } from 'react'

const initialProductData = {
  title:"",
  description:"",
  basePrice:"",
  discountPercent:"",
  weight:"",
  quantity:"",
  article:"",
  brand:"",
  manufacturer:"",
  isHealthyFood:false,
  isNonGMO:false,
  categories:[],
  tags:[],
}

const AddProductPage = () => {
  const [formData , setFormData] = useState<AddProductFormData>(initialProductData);
  return (
    <div>page</div>
  )
}

export default AddProductPage
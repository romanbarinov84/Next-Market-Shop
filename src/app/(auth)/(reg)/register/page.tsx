"use client"
import React, { useState } from 'react'

const initialFormData = {
    phone:"+3",
    surname:"",
    firstName:"",
    password:"",
    confirmPassword:"",
    birthdayDate:"",
    region:"",
    location:"",
    gender:"",
    card:"",
    email:'',
    hasCard:false,
}

const RegisterPage = () => {
    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState<{
        error:Error;
        userMessage:string;
    } | null>(null)
    const [formData , setFormData] = useState(initialFormData);

  return (
    <div className='fixed inset-0 z-100 flex items-center justify-center bg-[#f0a675cc] min-h-screen text-[#333]'>
      <div>Регистрация</div>
    </div>
  )
}

export default RegisterPage;
'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import PhoneInput from '../PhoneInput';
import PersonInput from '../PersonInput';
import PasswordInput from '../PasswordInput';
import DateInput from '../DateInput';
import GlobalLoader from '@/src/components/loading/GlobalLoader';
import ErrorComponent from '@/src/components/errorComponent/ErrorComponent';
import { validateRegisterForm } from '@/UTILS/validations/form';
import SelectRegion from '../SelectRegion';
import SelectCity from '../SelectCity';

const initialFormData = {
    phone: '+38',
    surname: '',
    firstName: '',
    password: '',
    confirmPassword: '',
    birthdayDate: '',
    region: '',
    location: '',
    gender: '',
    card: '',
    email: '',
    hasCard: false,
};

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{
    error: Error;
    userMessage: string;
  } | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [invalidFormMessage, setInvalidFormMessage] = useState("");
  const router = useRouter();

  const handleClose = () => {
    setFormData(initialFormData);
    router.back();
  };

  console.log(formData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, type } = e.target;
    const value = type === "checkbox" ? e.target.checked : e.target.value;

    if (invalidFormMessage) {
      setInvalidFormMessage("");
    }

    if (id === "hasCard" && value === true) {
      setFormData((prev) => ({
        ...prev,
        hasCard: true,
        card: "",
      }));

      return;
    }
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setInvalidFormMessage("");

    const validation = validateRegisterForm(formData);
    if (!validation.isValid) {
      setInvalidFormMessage(
        validation.errorMessage || "Заполните поля корректно"
      );
      setIsLoading(false);
      return;
    }
  };

  const isFormValid = () => validateRegisterForm(formData).isValid;

  if (isLoading) return <GlobalLoader />;
  if (error)
    return (
      <ErrorComponent error={error.error} userMessage={error.userMessage} />
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-sky-100/80 min-h-screen text-[#333]">
  <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl overflow-y-auto">
    <div className="flex justify-end p-4">
      <button
        onClick={handleClose}
        className="p-2 text-red-400 rounded bg-gray-100 hover:bg-gray-200 transition"
        aria-label="close"
      >
        X
      </button>
    </div>
    <h1 className="text-2xl font-bold text-center mb-6">Регистрация</h1>
    <h2 className="text-lg font-bold text-center mb-6">Обязательные поля</h2>
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="w-full px-6 pb-6 flex flex-col gap-4"
    >
      <div className="flex flex-wrap justify-center gap-8">
        <div className="flex flex-col gap-4 items-start">
          <PhoneInput value={formData.phone} onChangeAction={handleChange} />
            <PersonInput
                id="surname"
                label="Фамилия"
                value={formData.surname}
                onChange={handleChange}
              />
            <PersonInput
                id="firstName"
                label="Имя"
                value={formData.firstName}
                onChange={handleChange}
              />
         <PasswordInput
                id="password"
                label="Пароль"
                value={formData.password}
                onChangeAction={handleChange}
                showPassword={showPassword}
                togglePasswordVisibilityAction={() =>
                  setShowPassword(!showPassword)
                }
                showRequirements={true}
              />
              <PasswordInput
                id="confirmPassword"
                label="Подтвердите пароль"
                value={formData.confirmPassword}
                onChangeAction={handleChange}
                showPassword={showPassword}
                togglePasswordVisibilityAction={() =>
                  setShowPassword(!showPassword)
                }
                compareWith={formData.password}
              />
        </div>
        <div className="flex flex-col gap-4 items-start">
            <DateInput
                value={formData.birthdayDate}
                onChangeAction={(value) =>
                  setFormData((prev) => ({ ...prev, birthdayDate: value }))
                }
              />
          <SelectRegion
                value={formData.region}
                onChangeAction={handleChange}
              />
          <SelectCity  
          value={formData.region}
                onChangeAction={handleChange}
          />
          <input placeholder="Пол" className="border p-2 rounded w-72" />
        </div>
      </div>
      <button type="submit" className="bg-[#ff6633] text-white py-2 rounded hover:bg-blue-700 transition mt-4">
        Зарегистрироваться
      </button>
    </form>
  </div>
</div>
    );
};

export default RegisterPage;

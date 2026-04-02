'use client';

import ErrorComponent from '@/src/components/errorComponent/ErrorComponent';
import GlobalLoader from '@/src/components/loading/GlobalLoader';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import PasswordInput from '../../(reg)/_components/PasswordInput';
import PhoneInput from '../../(reg)/_components/PhoneInput';
import { AuthFormLayout } from '../../_components/AuthFormLayout';



const initialFormData = {
    phoneNumber: '+38',
    password: '',
};

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<{
        error: Error;
        userMessage: string;
    } | null>(null);
    const [formData, setFormData] = useState(initialFormData);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();



    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { id, value } = e.target;

        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phoneNumber: formData.phoneNumber.replace(/\D/g, ''),
                    password: formData.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Ошибка авторизации');
            }

            router.replace('/');
        } catch (error) {
            setError({
                error:
                    error instanceof Error
                        ? error
                        : new Error('Неизвестная ошибка'),
                userMessage:
                    (error instanceof Error && error.message) ||
                    'Ошибка авторизации. Попробуйте снова',
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <GlobalLoader />;
    if (error)
        return (
            <ErrorComponent
                error={error.error}
                userMessage={error.userMessage}
            />
        );

    return (
       <AuthFormLayout variant="register">
  <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-12">
    Вход
  </h1>
  <form
    onSubmit={handleSubmit}
    autoComplete="off"
    className="w-full max-w-[480px] mx-auto flex flex-col gap-6 overflow-y-auto pb-6"
  >
    <div className="w-full flex flex-wrap justify-center gap-6">
      <div className="flex flex-col gap-5 w-full">
        <PhoneInput
          value={formData.phoneNumber}
          onChangeAction={handleChange}
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
        />
      </div>
    </div>

    <button
      type="submit"
      disabled={
        !(formData.phoneNumber && formData.password) || isLoading
      }
      className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
        formData.phoneNumber && formData.password
          ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg"
          : "bg-gray-300 cursor-not-allowed"
      }`}
    >
      Вход
    </button>

    <div className="flex flex-row justify-between items-center mt-4 text-sm text-gray-600">
      <Link
        href="/register"
        className="hover:text-indigo-600 transition-colors duration-300"
      >
        Регистрация
      </Link>
      <Link
        href="/forgotPassword"
        className="hover:text-indigo-600 transition-colors duration-300"
      >
        Забыли пароль?
      </Link>
    </div>
  </form>
</AuthFormLayout>
    );
};

export default LoginPage;

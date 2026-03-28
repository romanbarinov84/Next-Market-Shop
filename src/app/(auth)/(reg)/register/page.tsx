'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import GlobalLoader from '@/src/components/loading/GlobalLoader';
import ErrorComponent from '@/src/components/errorComponent/ErrorComponent';
import { validateRegisterForm } from '@/UTILS/validations/form';
import SelectCity from '../_components/SelectCity';
import CheckboxCard from '../_components/CheckboxCard';
import SuccessModal from '../_components/SuccessModal';
import PersonInput from '../_components/PersonInput';
import PhoneInput from '../_components/PhoneInput';
import PasswordInput from '../_components/PasswordInput';
import DateInput from '../_components/DateInput';
import SelectRegion from '../_components/SelectRegion';
import GenderSelect from '../_components/GenderSelect';
import CardInput from '../_components/CardInput';
import EmailInput from '../_components/EmailInput';
import RegFormFooter from '../_components/RegFormFooter';

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
    const [invalidFormMessage, setInvalidFormMessage] = useState('');
    const router = useRouter();
    const [isSuccess, setIsSuccess] = useState(false);

    const handleClose = () => {
        setFormData(initialFormData);
        router.back();
    };

    

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { id, type } = e.target;
        const value = type === 'checkbox' ? e.target.checked : e.target.value;

        if (invalidFormMessage) {
            setInvalidFormMessage('');
        }

        if (id === 'hasCard' && value === true) {
            setFormData((prev) => ({
                ...prev,
                hasCard: true,
                card: '',
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

    try {
      const [day, month, year] = formData.birthdayDate.split(".");
      const formattedBirthdayDate = new Date(`${year}-${month}-${day}`);

      const userData = {
        ...formData,
        phone: formData.phone.replace(/\D/g, ""),
        birthdayDate: formattedBirthdayDate,
      };
       
      const res = await fetch("api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка регистрации");
      }

      setIsSuccess(true);
    } catch (error) {
      setError({
        error: error instanceof Error ? error : new Error("Неизвестная ошибка"),
        userMessage: "Ошибка регистрации. Попробуйте снова.",
      });
    } finally {
      setIsLoading(false);
    }
  };

    const isFormValid = () => validateRegisterForm(formData).isValid;

    if (isLoading) return <GlobalLoader />;
    if (error)
        return (
            <ErrorComponent
                error={error.error}
                userMessage={error.userMessage}
            />
        );

         if (isSuccess) return <SuccessModal  />;

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
                <h1 className="text-2xl font-bold text-center mb-6">
                    Регистрация
                </h1>
                <h2 className="text-lg font-bold text-center mb-6">
                    Обязательные поля
                </h2>
                <form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    className="w-full px-6 pb-6 flex flex-col gap-4"
                >
                    <div className="flex flex-wrap justify-center gap-8">
                        <div className="flex flex-col gap-4 items-start">
                            <PhoneInput
                                value={formData.phone}
                                onChangeAction={handleChange}
                            />
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
                                    setFormData((prev) => ({
                                        ...prev,
                                        birthdayDate: value,
                                    }))
                                }
                            />
                            <SelectRegion
                                value={formData.region}
                                onChangeAction={handleChange}
                            />
                            <SelectCity
                                value={formData.location}
                                onChangeAction={handleChange}
                            />
                            <GenderSelect
                                value={formData.gender}
                                onChangeAction={(gender) =>
                                    setFormData((prev) => ({ ...prev, gender }))
                                }
                            />
                        </div>
                    </div>
                    <h2 className="text-lg font-bold text-center mb-6 mt-10">
                        Необязательные поля
                    </h2>
                    <div className="w-full flex flex-row flex-wrap justify-center gap-x-8 gap-y-4">
                        <div className="flex flex-col justify-center gap-8">
                            <CardInput
                                value={formData.card}
                                onChangeAction={handleChange}
                                disabled={formData.hasCard}
                            />
                            <CheckboxCard
                                checked={formData.hasCard}
                                onChangeAction={handleChange}
                            />
                            <EmailInput
                                value={formData.email}
                                onChangeAction={handleChange}
                            />

                            {invalidFormMessage && (
                                <div className="text-red-500 text-center my-4 p-4 bg-red-50 rounded">
                                    {invalidFormMessage}
                                </div>
                            )}

                            <RegFormFooter isFormValid={isFormValid()} isLoading={isLoading} />
                        </div>
                    </div>
                </form>
            </div>
            
        </div>
    );
};

export default RegisterPage;

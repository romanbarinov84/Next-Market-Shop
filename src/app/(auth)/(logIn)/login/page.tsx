'use client';

import React, { useState } from 'react';
import { AuthFormLayout } from '../../_components/AuthFormLayout';
import { buttonStyles, formStyles } from '../../(reg)/_components/styles';
import { InputMask } from '@react-input/mask';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import GlobalLoader from '@/src/components/loading/GlobalLoader';
import { ErrorContent } from '../../(reg)/_components/ErrorContent';
import { MailWarning, PhoneOff } from "lucide-react";
import { AuthMethodSelector } from '../../_components/AuthMethodSelector';
import { UnverifiedEmail } from '../../_components/UnverifiedEmail';

const EnterLoginPage = () => {
    const [loginType, setLoginType] = useState<'email' | 'phone'>('email');
    const [login, setLogin] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showUnverifiedEmail, setShowUnverifiedEmail] = useState(false);
    const [showAuthMethodChoice, setShowAuthMethodChoice] = useState(false);
    const router = useRouter();

    const switchToEmail = () => {
        setLogin('');
        setLoginType('email');
    };

    const switchToPhone = () => {
        setLogin('');
        setLoginType('phone');
    };

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLogin(value);
        setError(null);
    };

    const handleToRegister = () => router.replace("/register");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        

        try {
            const response = await fetch('api/auth/check-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, loginType }),
            });

            const { exists, verified } = await response.json();

            if (!exists) {
                setError(
                    loginType === 'email'
                        ? 'Акаунт с таким email не существует'
                        : 'Акаунт с таким телефоном не существует',
                );
                return;
            }

            if (!verified && loginType === 'email') {
              setShowUnverifiedEmail(true);
              return
            }
            if (!verified && loginType === 'phone') {
              setError("Телефон не подтвержден зайдите по email");
              return
            };

            if(loginType === "phone"){
              setShowAuthMethodChoice(true)
            }else{
              router.push(`/password-enter?login=${encodeURIComponent(login)}&loginType=${loginType}`)
            }


        } catch (error) {
          setError("Ошибка при проверке данных")
        }finally{
          setIsLoading(false)
        }
    };

    if(isLoading){
      (<AuthFormLayout>
        <GlobalLoader/>
      </AuthFormLayout>
      )
    }

      if (error)
    return (
      <AuthFormLayout>
        <ErrorContent
          title="Упс!"
          error={error}
          icon={
            loginType === "email" ? (
              <MailWarning className="h-8 w-8 text-red-600" />
            ) : (
              <PhoneOff className="h-8 w-8 text-red-600" />
            )
          }
          secondaryAction={{
            label: "Регистрация",
            onClick: handleToRegister,
          }}
        />
      </AuthFormLayout>
    );

     if (showUnverifiedEmail) {
    return (
      <UnverifiedEmail
        email={login}
        setLoginAction={setLogin}
        setShowUnverifiedEmailAction={setShowUnverifiedEmail}
      />
    );
  }
  const handleBackFromMethodChoice = () => {
    setShowAuthMethodChoice(false);
    setLogin("");
    setLoginType("phone");
  };

      const handleAuthMethodSelect = (method: "password" | "otp") => {
    const cleanLogin = login.replace(/\D/g, "");

    router.replace(
      method === "password"
        ? `/password-enter?login=${encodeURIComponent(cleanLogin)}&loginType=phone`
        : `/otp-enter?login=${encodeURIComponent(cleanLogin)}&loginType=phone`
    );
  };

  if (showAuthMethodChoice) {
    return (
      <AuthMethodSelector
        phoneNumber={login}
        onBackAction={handleBackFromMethodChoice}
        onMethodSelectAction={handleAuthMethodSelect}
      />
    );
  }

 


    return (
        <AuthFormLayout>
            <h1 className="text-2xl font-bold text-[#414141] text-center mb-8">
                Вход
            </h1>
            <form
                onSubmit={handleSubmit}
                className="w-65 mx-auto max-h-screen flex flex-col justify-center overflow-y-auto gap-y-8"
                autoComplete="off"
            >
                <div className="w-full flex flex-row flex-wrap justify-center gap-x-8 gap-y-4 relative">
                    <div className="flex flex-col gap-y-4 items-start w-full">
                        <div>
                            <label
                                htmlFor="login"
                                className={formStyles.label}
                            ></label>
                            {loginType === 'email' ? 'E-mail' : 'Phone'}
                            {loginType === 'phone' ? (
                                <InputMask
                                    mask="38 (___) ___-__-__"
                                    replacement={{ _: /\d/ }}
                                    value={login}
                                    placeholder="+38 (___) ___-__-__"
                                    onChange={handleLoginChange}
                                    className={formStyles.input}
                                    required
                                />
                            ) : (
                                <input
                                    type="email"
                                    value={login}
                                    onChange={handleLoginChange}
                                    className={formStyles.input}
                                    placeholder="exampleMail@mail.com"
                                    required
                                ></input>
                            )}
                        </div>
                        <div className="flex gap-4 justify-center mt-4">
                            <button
                                type="button"
                                onClick={switchToEmail}
                                className="px-4 py-2 bg-[#ff6633] text-white rounded hover:bg-[#ff8844] transition-colors"
                            >
                                По E-mail
                            </button>
                            <button
                                type="button"
                                onClick={switchToPhone}
                                className="px-4 py-2 bg-(--color-primary) text-white rounded hover:bg-green-400  transition-colors"
                            >
                                По телефону
                            </button>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={
                        (loginType === 'email' &&
                            (!login.includes('@') || !login.includes('.'))) ||
                        (loginType === 'phone' &&
                            login.replace(/\D/g, '').length < 12) ||
                        isLoading
                    }
                    className={`
            ${buttonStyles.base} [&&]:my-0
           ${
               (loginType === 'email' &&
                   (!login.includes('@') || !login.includes('.'))) ||
               (loginType === 'phone' &&
                   login.replace(/\D/g, '').length < 12) ||
               isLoading
                   ? 'cursor-not-allowed bg-[#fcd5ba] text-[#ff6633]'
                   : 'bg-[#ff6633] text-white hover:shadow-(--shadow-article)'
           }
            active:shadow-(--shadow-button-active)
           duration-300
            
          `}
                >
                    Вход
                </button>
                <div className="flex flex-row flex-wrap mx-auto text-xs gap-4 justify-center">
                    <Link
                        href="/register"
                        className={`${formStyles.loginLink} w-auto px-2`}
                    >
                        Регистрация
                    </Link>
                    <Link
                        href="/forgot-password"
                        className="h-8 text-[#414141] hover:text-black w-30 flex items-center justify-center duration-300"
                    >
                        Забыли пароль?
                    </Link>
                </div>
            </form>
        </AuthFormLayout>
    );
};

export default EnterLoginPage;

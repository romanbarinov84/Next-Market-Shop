'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { AuthFormLayout } from '../../_components/AuthFormLayout';
import GlobalLoader from '@/src/components/loading/GlobalLoader';
import PasswordInput from '../../(reg)/_components/PasswordInput';
import { buttonStyles } from '../../(reg)/_components/styles';
import { authClient } from '@/src/lib/auth-client';
import { LoadingContent } from '../../(reg)/_components/LoadingContent';
import Tooltip from '../../(reg)/_components/Tooltip';

const EnterPasswordPage = () => {
    return (
        <Suspense
            fallback={
                <AuthFormLayout>
                    <GlobalLoader />
                </AuthFormLayout>
            }
        >
            <EnterPasswordContent />
        </Suspense>
    );
};

export default EnterPasswordPage;

const EnterPasswordContent = () => {
    const searchParams = useSearchParams();
    const loginParam = searchParams.get('login') || '';
    const loginType = searchParams.get('loginType') || '';
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setError(null);
    };

    const getErrorMessage = (error: unknown): string => {
        if (error instanceof Error) {
            return error.message.includes('Неверный пароль') ||
                error.message.includes('Invalid email or password')
                ? 'неверный пароль'
                : error.message;
        }

        return 'Произошла непредвиденная ошибка';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (loginType === 'phone') {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        phoneNumber: loginParam,
                        password,
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error('Неверный пароль или пользователь');
                }
                router.replace('/');
            } else {
                await authClient.signIn.email({
                    email: loginParam,
                    password,
                    callbackURL: '/',
                },
               { onSuccess:(ctx) =>{
                    router.replace("/")
                },
                onError:(ctx) => {
                    setError(ctx.error?.message || "Ошибка при входе")
                }}
            );
            }
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
  return (
    <AuthFormLayout>
      <LoadingContent title='Подождите идет авторизация' />
    </AuthFormLayout>
  );
}

    return (
        <AuthFormLayout>
            <h1 className="text-2xl font-bold text-[#414141] text-center mb-8">
                Вход
            </h1>

            <form
                onSubmit={handleSubmit}
                autoComplete="off"
                className="w-65 mx-auto flex flex-col gap-y-6"
            >
                <div className="flex flex-col gap-y-4">
                    <PasswordInput
                        id="password"
                        label="Пароль"
                        value={password}
                        onChangeAction={handleChange}
                        showPassword={showPassword}
                        togglePasswordVisibilityAction={() =>
                            setShowPassword(!showPassword)
                        }
                        inputClass="h-15"
                    />

                    {error && 
                       <Tooltip text={error} position="top"/>
                    }
                </div>

                <div className="flex gap-4 justify-center"></div>

                <button
                    type="submit"
                    disabled={!password || isLoading}
                    className={`
            ${buttonStyles.base}
            ${
                !password || isLoading
                    ? 'bg-[#fcd5ba] text-[#ff6633] cursor-not-allowed'
                    : 'bg-[#ff6633] text-white hover:shadow-(--shadow-article)'
            }
            active:shadow-(--shadow-button-active)
            duration-300
          `}
                >
                    {isLoading ? 'Загрузка...' : 'Вход'}
                </button>
            </form>
        </AuthFormLayout>
    );
};

'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { AuthFormLayout } from '../../_components/AuthFormLayout';
import GlobalLoader from '@/src/components/loading/GlobalLoader';
import PasswordInput from '../../(reg)/_components/PasswordInput';
import { buttonStyles } from '../../(reg)/_components/styles';
import { authClient } from '@/src/lib/auth-client';
import { LoadingContent } from '../../(reg)/_components/LoadingContent';
import Tooltip from '../../(reg)/_components/Tooltip';
import Link from 'next/link';

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
                await authClient.signIn.email(
                    {
                        email: loginParam,
                        password,
                        callbackURL: '/',
                    },
                    {
                        onSuccess: (ctx) => {
                            router.replace('/');
                        },
                        onError: (ctx) => {
                            setError(ctx.error?.message || 'Ошибка при входе');
                        },
                    },
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
                <LoadingContent title="Подождите идет авторизация" />
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
    <div className="flex flex-col gap-y-4 relative">
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

      {error && <Tooltip text={error} position="top" />}
    </div>

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

  {/* Ссылки вынесены наружу формы */}
  <div className="flex flex-row flex-wrap justify-center gap-x-6 mt-4 text-xs">
    <Link
      href="/login"
      className="h-8 text-[#414141] hover:text-black flex items-center justify-center gap-x-2 duration-300 cursor-pointer hover:-translate-x-1"
    >
      <ArrowLeft className="w-5 h-5" />
      Вернуться
    </Link>

    <Link
      href="/forgot-password"
      className="h-8 text-(--color-primary) hover:text-orange-400 flex items-center justify-center gap-x-2 duration-300 cursor-pointer hover:-translate-x-0.5"
    >
      Забыли пароль?
      <ArrowRight className="w-4 h-4" />
    </Link>
  </div>
</AuthFormLayout>
    );
};

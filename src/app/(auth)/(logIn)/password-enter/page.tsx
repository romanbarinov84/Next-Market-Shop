import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { AuthFormLayout } from '../../_components/AuthFormLayout';
import GlobalLoader from '@/src/components/loading/GlobalLoader';

const EnterPasswordPage = () => {
    return (
        <Suspense
            fallback={
                <AuthFormLayout>
                    <GlobalLoader/>
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
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    return <div></div>;
};

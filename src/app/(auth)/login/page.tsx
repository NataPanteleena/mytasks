'use client';
import AuthForm from '@/components/AuthForm/AuthForm';
import { useRouter } from 'next/navigation';
import { login } from '@/store/auth/thunks';
import { useAppDispatch } from '@/store/store';
import { IAuthCredentials, ILoginResponse } from '@/types';

export default function LoginPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogin = async (data: IAuthCredentials) => {
        try {
            const action = await dispatch(login(data));

            if (login.fulfilled.match(action)) {
                const payload = action.payload as ILoginResponse;
                router.push(`/tasks/${payload.user.id}`);
            } else if (login.rejected.match(action)) {
                throw new Error(action.error.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    return (
        <div className="auth-page">
            <AuthForm
                isLogin={true}
                onSubmitAction={handleLogin}
            />
        </div>
    );
}
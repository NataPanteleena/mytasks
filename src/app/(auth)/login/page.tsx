'use client';
import AuthForm from '@/components/AuthForm/AuthForm';
import { useRouter } from 'next/navigation';
import { login } from '@/store/auth/thunks';
import { useAppDispatch } from '@/store/store';

interface LoginResponse {
    user: {
        id: number;
        email: string;
        name: string;
    };
    token: string;
}

export default function LoginPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogin = async (email: string, password: string) => {
        try {
            const action = await dispatch(login({ email, password }));

            // Правильная типизация ответа
            if (login.fulfilled.match(action)) {
                const payload = action.payload as LoginResponse;
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
                onSubmit={handleLogin}
            />
        </div>
    );
}
'use client';
import AuthForm from '@/components/AuthForm/AuthForm';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import { register } from '@/store/auth/thunks';

interface RegisterResponse {
    user: {
        id: number;
        name: string;
        email: string;
    };
    token: string;
}

export default function RegisterPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleRegister = async (email: string, password: string, name: string) => {
        try {
            const action = await dispatch(register({ name, email, password }));

            if (register.fulfilled.match(action)) {
                const payload = action.payload as RegisterResponse;
                router.push(`/tasks/${payload.user.id}`);
            } else if (register.rejected.match(action)) {
                throw new Error(action.error.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    return (
        <div className="auth-page">
            <AuthForm
                isLogin={false}
                onSubmit={(email, password, name = '') => handleRegister(email, password, name)}
            />
        </div>
    );
}
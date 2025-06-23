'use client';
import AuthForm from '@/components/AuthForm/AuthForm';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import { register } from '@/store/auth/thunks';
import { IRegisterData, IAuthCredentials } from '@/types';

export default function RegisterPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleRegister = async (data: IRegisterData) => {
        try {
            const action = await dispatch(register(data));

            if (register.fulfilled.match(action)) {
                router.push(`/tasks/${action.payload.user.id}`);
            }

        } catch (error) {
            console.error('Registration failed:', error);
            return error;
        }
    };

    return (
        <div className="auth-page">
            <AuthForm isLogin={false} onSubmitAction={handleRegister as (data: IAuthCredentials | IRegisterData) => Promise<void>} />
        </div>
    );
}
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';
import {IAuthCredentials, IRegisterData} from "@/types";

interface IAuthFormProps {
    onSubmitAction: (data: IAuthCredentials | IRegisterData) => Promise<void>;
    isLogin: boolean;
}

export default function AuthForm({ onSubmitAction, isLogin }: IAuthFormProps) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (isLogin) {
                await onSubmitAction({email, password});
            } else {
                if (!name) {
                    setError('Необходимо ввести имя');
                    return;
                }
                await onSubmitAction({email, password, name});
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : '';
            if (errorMessage.includes('404') || errorMessage.includes('Failed to fetch')) {
                setError('Пользователь не найден');
            } else if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
                setError('Неверный email или пароль');
            } else {
                setError('Произошла ошибка при авторизации');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>

            {error && <div className={styles.error}>{error}</div>}

            <form onSubmit={handleSubmit} className={styles.authForm}>
                {!isLogin && (
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Имя</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                )}

                <div className={styles.formGroup}>
                    <label htmlFor="email">Адрес электронной почты</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Пароль</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={styles.submitButton}
                >
                    {isLoading ? 'Processing...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
                </button>
            </form>

            <div className={styles.switchAuth}>
                {isLogin ? (
                    <>
                        Нет учетной записи?{' '}
                        <button
                            onClick={() => router.push('/register')}
                            className={styles.linkButton}
                        >
                            Зарегистрироваться
                        </button>
                    </>
                ) : (
                    <>
                        Есть учетная запись?{' '}
                        <button
                            onClick={() => router.push('/login')}
                            className={styles.linkButton}
                        >
                            Войти
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
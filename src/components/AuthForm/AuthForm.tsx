'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';

interface AuthFormProps {
    onSubmit: (email: string, password: string, name?: string) => Promise<void>;
    isLogin: boolean;
}

export default function AuthForm({ onSubmit, isLogin }: AuthFormProps) {
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
                await onSubmit(email, password);
            } else {
                if (!name) {
                    throw new Error('Необходимо ввести имя');
                }
                await onSubmit(email, password, name);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Возникла ошибка');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>

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
                    <label htmlFor="email">Email</label>
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
'use client';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

function AuthChecker({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useSelector((state: RootState) => state.auth);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const authData = localStorage.getItem('auth');
        const savedUser = authData ? JSON.parse(authData).user : null;
        const isAuthenticated = user || savedUser;

        // Явно проверяем пути без учета групп роутинга
        const isLoginPage = pathname === '/login';
        const isRegisterPage = pathname === '/register';

        if (!isAuthenticated && !isLoginPage && !isRegisterPage) {
            router.push('/login');
        } else if (isAuthenticated && (isLoginPage || isRegisterPage)) {
            router.push(`/tasks/${user?.id || savedUser?.id}`);
        }

        setIsInitialized(true);
    }, [user, pathname, router]);

    if (!isInitialized) return null;

    return <>{children}</>;
}

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <Provider store={store}>
            <html lang="en">
            <body>
            <AuthChecker>{children}</AuthChecker>
            </body>
            </html>
        </Provider>
    );
}
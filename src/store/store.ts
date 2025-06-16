import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import tasksReducer from './tasks/slice';
import { useDispatch } from 'react-redux';

const loadAuthState = () => {
    if (typeof window === 'undefined') {
        return { user: null, token: null }; // Для серверного рендеринга
    }

    try {
        const authData = localStorage.getItem('auth');
        return authData ? JSON.parse(authData) : { user: null, token: null };
    } catch {
        return { user: null, token: null };
    }
};

const preloadedState = {
    auth: loadAuthState()
};

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: tasksReducer,
    },
    preloadedState
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
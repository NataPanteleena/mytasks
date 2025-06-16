import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '@/services/mockApi';
import { setCredentials } from './slice';

interface AuthResponse {
    user: {
        id: number;
        email: string;
        name: string;
    };
    token: string;
}

export const login = createAsyncThunk<AuthResponse, { email: string; password: string }>(
    'auth/login',
    async (credentials, { dispatch }) => {
        try {
            const response = await loginUser(credentials);

            dispatch(setCredentials({
                user: response.user,
                token: response.token
            }));

            localStorage.setItem('auth', JSON.stringify({
                user: response.user,
                token: response.token
            }));

            return response;
        } catch (error) {
            localStorage.removeItem('auth');
            throw error;
        }
    }
);

export const register = createAsyncThunk<AuthResponse, { name: string; email: string; password: string }>(
    'auth/register',
    async (userData, { dispatch }) => {
        try {
            const response = await registerUser(userData);

            dispatch(setCredentials({
                user: response.user,
                token: response.token
            }));

            localStorage.setItem('auth', JSON.stringify({
                user: response.user,
                token: response.token
            }));

            return response;
        } catch (error) {
            localStorage.removeItem('auth');
            throw error;
        }
    }
);
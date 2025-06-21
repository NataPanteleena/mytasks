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
        const response = await loginUser(credentials);
        return response;
    }
);

export const register = createAsyncThunk<AuthResponse, { name: string; email: string; password: string }>(
    'auth/register',
    async (userData, { dispatch }) => {
         const response = await registerUser(userData);
        return response;
    }
);
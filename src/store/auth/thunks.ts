import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '@/services/mockApi';

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
    async (credentials) => {
        //const response = await loginUser(credentials);
        //return response;
        return await loginUser(credentials)
    }
);

export const register = createAsyncThunk<AuthResponse, { name: string; email: string; password: string }>(
    'auth/register',
    async (userData) => {
        //const response = await registerUser(userData);
        //return response;
        return registerUser(userData)
    }
);
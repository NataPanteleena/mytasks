import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '@/services/mockApi';
import {IUser} from "@/types";

interface AuthResponse {
    user: IUser;
    token: string;
}

export const login = createAsyncThunk<AuthResponse, { email: string; password: string }>(
    'auth/login',
    async (credentials) => {
        return await loginUser(credentials);
    }
);

export const register = createAsyncThunk<AuthResponse, { name: string; email: string; password: string }>(
    'auth/register',
    async (userData, {rejectWithValue}) => {
        try {
            return registerUser(userData);
        } catch {
            return rejectWithValue("Произошла ошибка");
        }
    }
);
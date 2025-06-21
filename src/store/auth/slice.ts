import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {login, register} from "@/store/auth/thunks";

interface User {
    id: number;
    email: string;
    name: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
}

// Функция для загрузки состояния из localStorage
const loadAuthState = (): AuthState => {
    if (typeof window === 'undefined') {
        return { user: null, token: null };
    }

    try {
        const authData = localStorage.getItem('auth');
        return authData ? JSON.parse(authData) : { user: null, token: null };
    } catch (error) {
        console.error('Failed to parse auth state', error);
        return { user: null, token: null };
    }
};

const initialState: AuthState = loadAuthState();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('auth', JSON.stringify(state));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('auth');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('auth', JSON.stringify(state));
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('auth', JSON.stringify(state));
            });
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
import {ITask, IUser} from "@/types";
import axios from "axios";

export const API_URL = 'https://68541614a2a37a1d6f4b29cc.mockapi.io/api/mytasks';

export const loginUser = async (credentials: { email: string; password: string }) => {
   const response = await axios.get(`${API_URL}/users?email=${credentials.email}`);
   const user = response.data[0];

    if (user.password !== credentials.password) {
        throw new Error('Неверный email или пароль');
    }

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        token: 'mock-token-' + user.id
    };
};

export const registerUser = async (userData: { name: string; email: string; password: string }) => {
    const allUsers = await axios.get(`${API_URL}/users`);

    const userExists = allUsers.data.some((user: IUser) => user.email === userData.email);
    if (userExists) {
        throw new Error('Пользователь с таким email уже существует.');
    }

    const response = await axios.post(`${API_URL}/users`, userData);
    return {
        user: response.data,
        token: 'mock-token-' + response.data.id
    };
};

export const fetchUserTasks = async (userId: number) => {
    const response = await axios.get(`${API_URL}/tasks?userId=${userId}`);
    if (response.data.length === 0) {
        throw new Error('Задач пока нет.');
    } else {
    return response.data;
    }
};

export const addTask = async (taskData: Omit<ITask, 'id'>) => {
    const response = await axios.post(`${API_URL}/tasks`, {
        ...taskData,
        userId: taskData.userId
    });
    return response.data;
};

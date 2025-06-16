import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserTasks, addTask as apiAddTask } from '../../services/mockApi';
import {ITask} from "@/types";

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (userId: number) => {
        const response = await fetchUserTasks(userId);
        return response;
    }
);

export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (taskData: Omit<ITask, 'id'>) => {
        const response = await apiAddTask(taskData);
        return response;
    }
);
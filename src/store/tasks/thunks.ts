import { createAsyncThunk } from '@reduxjs/toolkit';
import {fetchUserTasks, addTask as apiAddTask, API_URL} from '../../services/mockApi';
import {ITask} from "@/types";
import {addTask, deleteTask} from "@/store/tasks/slice";
import axios from "axios";

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

export const deleteTaskOptimistic = createAsyncThunk(
    'tasks/deleteOptimistic',
    async (taskId: number, { dispatch, rejectWithValue }) => {
        try {
            // 1. Оптимистичное обновление
            dispatch(deleteTask(taskId));

            // 2. Отправка на сервер
            await axios.delete(`${API_URL}/tasks/${taskId}`);

            return taskId;
        } catch (error) {
            // 3. В случае ошибки - возвращаем задачу
            dispatch(addTask(/* объект задачи из state.tasks */));
            return rejectWithValue('Failed to delete');
        }
    }
);
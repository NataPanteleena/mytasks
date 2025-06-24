import { createAsyncThunk } from '@reduxjs/toolkit';
import {fetchUserTasks, addTask as apiAddTask, API_URL} from '../../services/mockApi';
import {ITask} from "@/types";
import {addTask, deleteTask, toggleTaskCompletion} from "@/store/tasks/slice";
import axios from "axios";
import {RootState} from "@/store/store";

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (userId: number) => {
        return await fetchUserTasks(userId);
    }
);

export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (taskData: Omit<ITask, 'id'>, { dispatch, rejectWithValue }) => {
        const tempId = Date.now();
        dispatch(addTask({ ...taskData, id: tempId }));

        try {
            return await apiAddTask(taskData);

        } catch {
            dispatch(deleteTask(tempId)); // Удаляем задачу из UI
            return rejectWithValue('Не удалось создать задачу');
        }
    }
);

export const deleteTaskOptimistic = createAsyncThunk(
    'tasks/deleteOptimistic',
    async (taskId: number, { dispatch, getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const taskToDelete = state.tasks.tasks.find(task => task.id === taskId);

        if (!taskToDelete) {
            return rejectWithValue('Задача не найдена');
        }

        try {
            dispatch(deleteTask(taskId));
            await axios.delete(`${API_URL}/tasks/${taskId}`);

            return taskId;
        } catch {
            if (taskToDelete) {
                dispatch(addTask(taskToDelete));
            }
            return rejectWithValue('Ошибка при удалении задачи');
        }
    }
);

export const toggleTaskOptimistic = createAsyncThunk (
    'tasks/toggleOptimistic',
    async (taskId: number, {dispatch, getState, rejectWithValue}) =>{
        const state = getState() as RootState;
        const taskToToggle = state.tasks.tasks.find(task => task.id === taskId);

        if (!taskToToggle) {
            return rejectWithValue('Задача не найдена');
        }

        try {
            dispatch(toggleTaskCompletion(taskId));
            await axios.put(`${API_URL}/tasks/${taskId}`, {
                ...taskToToggle, // Отправляем всю задачу
                completed: !taskToToggle.completed,
            });
        } catch {
            dispatch(toggleTaskCompletion(taskId)); // предыдущее состояние
            return rejectWithValue('Не удалось обновить задачу');
        }
    }
)
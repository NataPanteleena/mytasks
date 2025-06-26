import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '@/types';
import {fetchTasks} from "@/store/tasks/thunks";
import {logout} from "@/store/auth/slice";


interface TasksState {
    tasks: ITask[];
    loading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null,
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<ITask>) => {
            state.tasks.push(action.payload);
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        toggleTaskCompletion: (state, action: PayloadAction<number>) => {
            const task = state.tasks.find((task) => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        replaceTask(state, action: PayloadAction<{tempId: number; newTask: ITask}>) {
            const {tempId, newTask} = action.payload;
            const taskIndex = state.tasks.findIndex(task => task.id === tempId);
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = newTask;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch';
            })
            .addCase(logout, state => {
                state.tasks = [];
                state.loading = false;
                state.error = null;
            })

    }
});

export const { addTask, deleteTask, toggleTaskCompletion, replaceTask } = tasksSlice.actions;
export default tasksSlice.reducer;
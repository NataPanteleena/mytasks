import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '@/types';

interface TasksState {
    tasks: ITask[];
    loading: boolean;
}

const initialState: TasksState = {
    tasks: [],
    loading: false,
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<ITask>) => {
            state.tasks.push(action.payload);
        },
        removeTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
    },
});

export const { addTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
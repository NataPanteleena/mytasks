import { RootState } from '../store';

export const getTasks = (state: RootState) => state.tasks.tasks;
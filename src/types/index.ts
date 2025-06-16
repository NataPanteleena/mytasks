export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface ITask {
    id: number;
    text: string;
    category: string;
    priority: boolean;
    completed: boolean;
    userId: number;
}
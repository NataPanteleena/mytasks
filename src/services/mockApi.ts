interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface ITask {
    id: number;
    text: string;
    completed: boolean;
    category: string;
    priority: boolean;
    userId: number;
}

const users: IUser[] = [
    { id: 1, name: 'User One', email: 'user1@test.com', password: '123456' },
    { id: 2, name: 'User Two', email: 'user2@test.com', password: '123456' },
];

const tasks: ITask[] = [
    { id: 1, text: 'Task 1', completed: false, category: 'Work', priority: false, userId: 1 },
    { id: 2, text: 'Task 2', completed: true, category: 'Personal', priority: true, userId: 1 },
];

export const loginUser = async (credentials: { email: string; password: string }) => {
    const user = users.find(u =>
        u.email === credentials.email &&
        u.password === credentials.password
    );

    if (!user) throw new Error('Invalid credentials');

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        token: 'mock-token'
    };
};

export const registerUser = async (userData: { name: string; email: string; password: string }) => {
    const newUser = { ...userData, id: users.length + 1 };
    users.push(newUser);
    return { user: newUser, token: 'mock-token' };
};

export const fetchUserTasks = async (userId: number) => {
    return tasks.filter(task => task.userId === userId);
};

export const addTask = async (taskData: Omit<ITask, 'id'>) => {
    const newTask = { ...taskData, id: tasks.length + 1 };
    tasks.push(newTask);
    return newTask;
};
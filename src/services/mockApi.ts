import {IUser, ITask} from "@/types";

const users: IUser[] = [
    { id: 1, name: 'User One', email: 'user1@test.com', password: '123456' },
    { id: 2, name: 'User Two', email: 'user2@test.com', password: '123456' },
];

// Инициализация задач
let tasks: ITask[] = [];

// Безопасный доступ к localStorage
const getLocalStorage = (): Storage | null => {
    return typeof window !== 'undefined' ? window.localStorage : null;
};

// Загрузка задач из localStorage
const loadTasks = (): ITask[] => {
    try {
        const storage = getLocalStorage();
        const saved = storage?.getItem('mockTasks');
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('Error loading tasks:', error);
        return [];
    }
};

// Инициализация задач при загрузке модуля
tasks = loadTasks();

export const loginUser = async (credentials: { email: string; password: string }) => {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = users.find(u =>
        u.email === credentials.email &&
        u.password === credentials.password
    );

    if (!user) {
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
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 500));

    // Проверка на существующий email
    if (users.some(u => u.email === userData.email)) {
        throw new Error('Пользователь с таким email уже существует');
    }

    // Генерация нового ID
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = { ...userData, id: newId };

    users.push(newUser);

    return {
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        },
        token: 'mock-token-' + newId
    };
};

export const fetchUserTasks = async (userId: number) => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Имитация загрузки
    return tasks.filter(task => task.userId === userId);
};

export const addTask = async (taskData: Omit<ITask, 'id'>) => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const newTask = { ...taskData, id: newId };

    tasks.push(newTask);

    // Сохранение в localStorage
    try {
        const storage = getLocalStorage();
        storage?.setItem('mockTasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving tasks:', error);
    }

    return newTask;
};

export const mockApi = {
    baseURL: '/api/mock-tasks',
    tasks,
};
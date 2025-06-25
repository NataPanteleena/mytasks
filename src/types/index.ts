export interface IUser {
    id: number;
    name: string;
    email: string;
}

export interface ITask {
    id: number;
    text: string;
    category: string;
    priority: boolean;
    completed: boolean;
    userId: IUser["id"];
}

export interface IAuthCredentials {
    email: string;
    password: string;
}

export interface IRegisterData {
    email: string;
    password: string;
    name: string;
}

export interface ILoginResponse {
    user: {
        id: number;
        email: string;
        name: string;
    };
    token: string;
}

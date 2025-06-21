'use client';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import {RootState, useAppDispatch} from '@/store/store';
import { fetchTasks } from '@/store/tasks/thunks';
import styles from "../../styles.module.scss";
import TaskInput from '@/components/TaskInput/TaskInput';
import Header from "@/components/Header/Header";
import TasksPanel from "@/components/TaskPanel/TaskPanel";

export default function TasksPage() {
    const params = useParams();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const userId = Number(params.userId);
    const { loading } = useSelector((state: RootState) => state.tasks);
    const { user } = useSelector((state: RootState) => state.auth);


    useEffect(() => {
        // Проверяем наличие пользователя в localStorage на случай, если страница была перезагружена
        const authData = localStorage.getItem('auth');
        const savedUser = authData ? JSON.parse(authData).user : null;

        if (!user && !savedUser) {
            router.push('/login');
            return;
        }

        if (user?.id !== userId) {
            router.push(`/tasks/${user?.id || savedUser?.id}`);
            return;
        }

        dispatch(fetchTasks(userId));
    }, [user, userId, dispatch, router]);

    if (!user) return <div>Проверка авторизации...</div>;

    return (
        <div className={styles.app}>
            <h1 className="text-xl font-bold mb-4">Задачи пользователя {user.name}</h1>
            <Header title="TODO List" text="Дорогу осилит идущий... Топай давай!!!" />
            <TaskInput userId={userId} />
            <TasksPanel userId={userId}/>
        </div>
    );
}
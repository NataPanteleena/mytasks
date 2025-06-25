'use client';
import {useEffect, useState} from 'react';
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
    const { user } = useSelector((state: RootState) => state.auth);
    const [isMounted, setIsMounted] = useState(false);


    useEffect(() => {
        setIsMounted(true);

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

    if (!isMounted) return <div>Загрузка...</div>;
    if (!user) return <div>Проверка авторизации...</div>;

    return (
        <div className={styles.app}>
            <Header title="Список Задач" text="«Путешествие в тысячу ли начинается с одного шага»" />
            <TaskInput userId={userId} />
            <TasksPanel userId={userId}/>
        </div>
    );
}
'use client';
import {ReactNode, useEffect, useState} from 'react';
import styles from './styles.module.scss';
import Categories from "@/components/Categories/Categories";
import Filters from "@/components/Filters/Filters";
import { useSelector } from 'react-redux';
import {RootState, useAppDispatch} from '@/store/store';
import { fetchTasks } from '@/store/tasks/thunks';
import TaskList from '@/components/TaskList/TaskList';
import {getTasks} from "@/store/tasks/selector";

export default function TasksPanel({ userId }: { userId: number }): ReactNode {
    const dispatch = useAppDispatch();
    const tasks = useSelector((state: RootState) => getTasks(state));
    const { loading } = useSelector((state: RootState) => state.tasks);

    const [filter, setFilter] = useState<string>('all');
    const [category, setCategory] = useState<string>('Все');

    useEffect(() => {
        dispatch(fetchTasks(userId))
    }, [dispatch, userId]);

    // Фильтрация задач на клиенте
    const filteredTasks = tasks.filter(task => {
        // Фильтр по категории
        const categoryMatch = category === 'Все' || task.category === category;

        // Фильтр по статусу
        let statusMatch = true;
        if (filter === 'completed') statusMatch = task.completed;
        if (filter === 'active') statusMatch = !task.completed;

        return categoryMatch && statusMatch;
    });

    return (
        <div className={styles.task_panel}>
            {loading && <div>Загрузка задач...</div>}
            <div className={styles.btn_block}>
                <Categories category={category} setCategory={setCategory} />
                <Filters filter={filter} setFilter={setFilter} />
            </div>
            <TaskList tasks={filteredTasks} />
        </div>
    );
}
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


    return (
        <div className={styles.task_panel}>
            {loading && <div>Загрузка задач...</div>}
            <div className={styles.btn_block}>
                <Categories category={category} setCategory={setCategory} />
                <Filters filter={filter} setFilter={setFilter} />
            </div>
            <TaskList tasks={tasks} filter={filter} category={category} />
        </div>
    );
}
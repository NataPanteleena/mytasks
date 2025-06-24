import {ITask} from "@/types";
import styles from "./styles.module.scss";
import React, {ReactNode} from 'react';
import { useAppDispatch } from '@/store/store';

import {deleteTaskOptimistic, toggleTaskOptimistic} from "@/store/tasks/thunks";

interface IProps {
    task: ITask;
}

const TaskItem: React.FC<IProps> = ({ task }: IProps): ReactNode => {
  const dispatch = useAppDispatch();

    const getBackgroundColor = (category: ITask['category']): string => {
      switch (category) {
        case 'Работа' :
          return styles.categoryWork;
        case 'Дом' :
          return styles.categoryHome;
        case 'Личные' :
          return styles.categoryPersonal;
        default:
          return styles.categoryOthers;
      }
    };

    const getPriority = (priority: ITask['priority']): string | undefined => {
      if (priority) {
        return styles.highPriority
      }
    };

    const handleDeleteTask = async () : Promise<void> => {
      try {
        dispatch(deleteTaskOptimistic(task.id));
      } catch (error) {
        console.error('Ошибка при удалении задачи:', error);
      }
    };

    const handleToggleCompletion = async () : Promise<void> => {
      try {
        dispatch(toggleTaskOptimistic(task.id));
      } catch (error) {
        console.error('Ошибка при обновлении задачи:', error);
      }
    };

    const getToggleMark = (completed: ITask['completed']) => {
      if (completed) {
        return styles.completed;
      }
    };

  const getTaskTextClass = (completed: ITask['completed']) => {
    return completed ? styles.taskItem__task_completed : '';
  };

    return (
      <div className={`${getPriority(task.priority)} ${getBackgroundColor(task.category)} ${getToggleMark(task.completed)}`}>
          <li className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className={styles.taskItem}>
            <span className={styles.taskItem__category}>{task.category}</span>
            <div>
            <input
              className={styles.taskItem__checkbox}
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleCompletion}
            />
            </div>
            <span className={`${styles.taskItem__task} ${getTaskTextClass(task.completed)}`}>{task.text}</span>
            <button className={styles.taskItem__button} onClick={handleDeleteTask}>Удалить</button>
            </div>
          </li>
      </div>
    );
};

export default TaskItem;
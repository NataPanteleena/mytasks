import {ITask} from "@/types";
import styles from "./styles.module.scss";
import React, {ReactNode} from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskCompletion } from "@/store/tasks/slice";

interface IProps {
    task: ITask;
}

const TaskItem: React.FC<IProps> = ({ task }: IProps): ReactNode => {
  const dispatch = useDispatch();

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
        dispatch(deleteTask(task.id));
      } catch (error) {
        console.error('Ошибка при удалении задачи:', error);
      }
    };

    const handleToggleCompletion = async () : Promise<void> => {
      try {
        dispatch(toggleTaskCompletion(task.id));
      } catch (error) {
        console.error('Ошибка при обновлении задачи:', error);
      }
    };

    return (
      <div className={`${getPriority(task.priority)} ${getBackgroundColor(task.category)}`}>
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
            <span className={styles.taskItem__task} >{task.text}</span>
            <button className={styles.taskItem__button} onClick={handleDeleteTask}>Удалить</button>
            </div>
          </li>
      </div>
    );
};

export default TaskItem;
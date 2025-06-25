import style from './styles.module.scss';
import TaskItem from '../TaskItem/TaskItem';
import React, {ReactNode} from 'react';
import {ITask} from "@/types";

interface IProps {
  tasks: ITask[];
}

const TaskList: React.FC<IProps> = ({ tasks }: IProps): ReactNode => {
    if (tasks.length === 0) {
        return (
            <div className={style.tasks_no_list}>
                <p className={style.tasks_no_message}>У вас еще нет задач! Начнем?</p>
            </div>
        );
    }
    return (
        <div className={style.tasks_list}>
            <ul className={style.ul}>
                {tasks.map((task):ReactNode => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
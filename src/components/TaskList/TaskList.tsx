import style from './styles.module.scss';
import TaskItem from '../TaskItem/TaskItem';
import React, {ReactNode} from 'react';
import {ITask} from "@/types";

interface IProps {
  tasks: ITask[];
}

const TaskList: React.FC<IProps> = ({ tasks }: IProps): ReactNode => {
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
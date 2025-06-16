import style from './styles.module.scss';
import TaskItem from '../TaskItem/TaskItem';
import React, {ReactNode} from 'react';
import {ITask} from "@/types";

interface IProps {
  tasks: ITask[];
  filter:string;
  category:string;
}

const TaskList: React.FC<IProps> = ({ tasks, filter, category }: IProps): ReactNode => {

  const filteredTasks = tasks.
  filter((task): boolean => {
      if (category === 'Все') return true;
      return task.category === category;
    })
    .filter((task):boolean => {
      if (filter === 'completed') return task.completed;
      if (filter === 'active') return !task.completed;
      return true;
    });

  return (
    <div className={style.tasks_list}>
        <ul>
          {filteredTasks.map((task):ReactNode => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
    </div>
  );
};

export default TaskList;
import React, {ReactNode, useState} from 'react';
import style from "./styles.module.scss";
import { useDispatch } from 'react-redux';
import { addTask } from '@/store/tasks/slice';
import { addTask as addMockTask } from '@/services/mockApi';

interface IProps {
    userId: number;
}

const TaskInput: React.FC<IProps> = ({ userId }: IProps): ReactNode => {
    const [inputValue, setInputValue] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<string>('Без категории');
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();


    const handleCheckboxChange = (event:React.ChangeEvent<HTMLInputElement>):void => {
        setChecked(event.target.checked);
    };

    const handleAddTask = async (): Promise<void> => {
        if (inputValue.trim()) {
            const newTask = {
                id: Date.now(),
                text: inputValue,
                category:selectedOption,
                priority:checked,
                completed: false,
                userId: userId,
            };

            try {
                const response = await addMockTask(newTask);
                console.log('Задача успешно сохранена:', response);

                dispatch(addTask(response));

                setInputValue('');
                setSelectedOption('Без категории');
                setChecked(false);
            } catch (error) {
                console.error('Ошибка при сохранении задачи:', error)}
        }
    };

    return (
        <div className={style.task_input}>
            <input className={style.task_text}
                   type="text"
                   placeholder="Введите задачу..."
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
            />
            <label className={style.checkbox} htmlFor="select">Срочно?</label>
            <input
                type="checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
            />
            <form>
                <select className={style.select_form}
                        id="select"
                        value={selectedOption}
                        onChange={(event) => setSelectedOption(event.target.value)}>
                    <option value="Без категории">Без категории</option>
                    <option value="Работа">Работа</option>
                    <option value="Дом">Дом</option>
                    <option value="Личные">Личные</option>
                </select>
            </form>
            <button onClick={handleAddTask}>Добавить</button>
        </div>
    );
};

export default TaskInput;
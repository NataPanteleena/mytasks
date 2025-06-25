import styles from './styles.module.scss';
import React, {ReactNode} from 'react';

interface IProps {
    filter: string;
    setFilter: (filter: string) => void;
}

const filterVariants = [
    {key: "all", variant: "Все"},
    {key: "active", variant: "Невыполненные"},
    {key: "completed", variant: "Выполненные"},
];

const Filters: React.FC<IProps> = ({ filter, setFilter }: IProps): ReactNode  => {


    return (
        <div>
            <h2 className={styles.btn_h2}>Статус</h2>
            <div className={styles.filters}>
                {filterVariants.map(({key, variant}):ReactNode => (
                    <button
                        key={key}
                        className={`${styles.filters_btn} ${filter === key ? styles.active : styles.passive}`}
                        onClick={():void => setFilter(key)}
                    >
                        {variant}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Filters;
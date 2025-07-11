import styles from './styles.module.scss';
import React, {ReactNode} from 'react';


interface IProps {
    category: string;
    setCategory: (category: string) => void;
}

const categoriesVariants = [
    {key: "Все", variant: "Все"},
    {key: "Дом", variant: "Дом"},
    {key: "Работа", variant: "Работа"},
    {key: "Личные", variant: "Личные"},
    {key: "Без категории", variant: "Без категории"},
]

const Categories: React.FC<IProps> = ({category, setCategory}: IProps):ReactNode => {

    return (
        <div>
            <h2 className={styles.btn_h2}>Категории</h2>
            <div className={styles.categories}>
                {categoriesVariants.map(({key, variant}):ReactNode => (
                    <button
                        key={key}
                        className={`${styles.categories_btn} ${category === key ? styles.active : styles.passive}`}
                        onClick={():void => setCategory(key)}
                    >
                        {variant}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Categories;
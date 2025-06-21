import styles from './styles.module.scss';
import React, {ReactNode} from 'react';


interface IProps {
    category: string;
    setCategory: (category: string) => void;
}

const categoriesVariants = [
    {key: "all", variant: "Все"},
    {key: "home", variant: "Дом"},
    {key: "work", variant: "Работа"},
    {key: "personal", variant: "Личные"},
    {key: "other", variant: "Без категории"},
]

const Categories: React.FC<IProps> = ({category, setCategory}: IProps):ReactNode => {

    return (
        <div >
            <h2 className={styles.btn_h2}>Категории</h2>
            <div className={styles.categories}>
                {categoriesVariants.map(({key, variant}):ReactNode => (
                    <button
                        key={key}
                        className={category === key ? styles.active : styles.passive}
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
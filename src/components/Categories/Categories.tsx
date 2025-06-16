import style from './styles.module.scss';
import React from 'react';


interface IProps {
    category: string;
    setCategory: (category: string) => void;
}


const Categories: React.FC<IProps> = ({category, setCategory}: IProps):JSX.Element => {

    return (
      <div className="categories">
        <div>
          <h2 className={style.btn_h2}>Категории</h2>
          <button
            key="all"
            className={category === 'Все' ? style.active : ''}
            onClick={():void => setCategory('Все')}
          >
            Все категории
          </button>
          <button
            key="home"
            className={category === 'Дом' ? style.active : ''}
            onClick={():void => setCategory('Дом')}
          >
            Дом
          </button>
          <button
            key="work"
            className={category === 'Работа' ? style.active : ''}
            onClick={():void => setCategory('Работа')}
          >
            Работа
          </button>
          <button
            key="personal"
            className={category === 'Личные' ? style.active : ''}
            onClick={():void => setCategory('Личные')}
          >
            Личные
          </button>
          <button
            key="other"
            className={category === 'Без категории' ? style.active : ''}
            onClick={():void => setCategory('Без категории')}
          >
            Без категории
          </button>
        </div>
      </div>
    );
  };

        export default Categories;
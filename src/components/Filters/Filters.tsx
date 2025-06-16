import style from './styles.module.scss';
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
      <div className="filters">
        <h2 className={style.btn_h2}>Статус</h2>
        {filterVariants.map(({key, variant}):ReactNode => (
        <button
          key={key}
          className={filter === key ? style.active : ''}
          onClick={():void => setFilter(key)}
        >
          {variant}
        </button>
          ))}
      </div>
    );
};

export default Filters;
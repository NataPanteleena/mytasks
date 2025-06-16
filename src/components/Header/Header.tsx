import style from './styles.module.scss';
import myLogo from "../../../public/icons/hedgehog.svg";
import React, {ReactNode} from 'react';
import Image from "next/image";

interface IProps {
    title: string;
    text: string;
}

const Header: React.FC<IProps> = ({ title, text}: IProps):ReactNode => {

    return (
      <header className={style.header}>
          <Image src={myLogo} className={style.logo} alt="logo" />
          <div className={style.header__textblock}>
              <h1>{title}</h1>
              <span className={style.headertext}>{text}</span>
          </div>
      </header>
    );
};

export default Header;
import styles from './styles.module.scss';
import myLogo from "../../../public/icons/hedgehog.svg";
import React, {ReactNode} from 'react';
import Image from "next/image";
import {logout} from "@/store/auth/slice";
import {RootState, useAppDispatch} from "@/store/store";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";


interface IProps {
    title: string;
    text: string;
}

const Header: React.FC<IProps> = ({ title, text}: IProps):ReactNode => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    }

    return (
        <header className={styles.header}>
            <div className={styles.header__userblock}>
                <h1 className={styles.header_userDef}>Пользователь: {user?.name}</h1>
                <button className={styles.exit_button} onClick={handleLogout}>Выйти</button>
            </div>
            <div className={styles.header_innerBlock}>
                <Image src={myLogo} className={styles.logo} alt="logo" />
                <div className={styles.header__textblock}>
                    <h1 className={styles.h1_main}>{title}</h1>
                    <span className={styles.headertext}>{text}</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
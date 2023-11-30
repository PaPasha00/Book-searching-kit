import React from "react";
import classes from './Registration.module.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(''); // Добавлено состояние для логина
    const [password, setPassword] = useState(''); // Добавлено состояние для пароля
    const [passwordTwo, setPasswordTwo] = useState(''); // Добавлено состояние для пароля

    const handleLoginChange = (event: any) => {
        setLogin(event.target.value);
    };
    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };
    const handlePasswordChangeTwo = (event: any) => {
        setPasswordTwo(event.target.value);
    };

    const handleLoginClick = () => {
        if (localStorage.getItem(login) === null && password === passwordTwo) {
            //@ts-ignore
            localStorage.setItem(`${login}`, JSON.stringify({login, password, books: []}))
            localStorage.setItem('currentAccount', JSON.stringify({login}))
            navigate('/Office')
        } else alert('Ошибка')
    };

    return (
        <div className={classes.Auth}>
            <div className={classes.areaCont}>
                <h1>Регистрация</h1>
                <input type="text" value={login} onChange={handleLoginChange} className={classes.textArea} placeholder="Login" />
                <input type="password" onChange={handlePasswordChange} value={password} className={classes.textArea} placeholder="Пароль" />
                <input type="password" onChange={handlePasswordChangeTwo} value={passwordTwo} className={classes.textArea} placeholder="Повторите пароль" />
                <button className={classes.button} onClick={handleLoginClick}>Регистрация</button>
                <div className={classes.secondCont}>
                </div>
            </div>
        </div>
    );
}

export default Registration;
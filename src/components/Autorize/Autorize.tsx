import React, { useState } from "react";
import classes from './Autorize.module.css';
import { Link } from "react-router-dom";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

const Auth = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(''); // Добавлено состояние для логина
    const [password, setPassword] = useState(''); // Добавлено состояние для пароля

    const handleLoginChange = (event: any) => {
        setLogin(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };


    //@ts-ignore
    const handleLoginClick = () => {
        if (localStorage.getItem(login) !== null) {
            //@ts-ignore
            if (JSON.parse(localStorage.getItem(login)).login === login && JSON.parse(localStorage.getItem(login)).password === password) {
                localStorage.setItem('currentAccount', JSON.stringify({login}))
                navigate("/Office");
            }
        } else alert('Проверьте введенные данные или зарегистрируйтесь')
    };

    return (
        <div className={classes.Auth}>
            <div className={classes.areaCont}>
                <h1>Войдите в свой аккаунт</h1>
                <input type="text" onChange={handleLoginChange} value={login} className={classes.textArea} placeholder="Login" />
                <input type="password" onChange={handlePasswordChange} value={password} className={classes.textArea} placeholder="Пароль" />
                <button className={classes.button} onClick={handleLoginClick}> Войти</button>
                <div className={classes.secondCont}>
                    <span>Нет учётной записи?  </span>
                    <Link className={classes.buttonText} to="/Registration"> Регистрация</Link>
                </div>
                
            </div>
        </div>
    );
};

export default Auth;
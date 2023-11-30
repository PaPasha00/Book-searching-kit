import React, { useEffect } from "react";
import classes from './HeaderMain.module.css';
import { Link } from "react-router-dom";
import { useState } from "react";

const HeaderMain = () => {
    const [acc, setAccount] = useState('')
    useEffect(() => {
        //@ts-ignore
        if (JSON.parse(localStorage.getItem('currentAccount')) === null) {
            setAccount('Log in')
        } else setAccount(
            //@ts-ignore
            JSON.parse(localStorage.getItem
                (
                    //@ts-ignore
                    JSON.parse(localStorage.getItem('currentAccount'))?.login
                )
            )?.login
        )
    }, []);
    return (
        <header className={classes.container}>
            <Link to='/'>
                <img src="/logo.png" alt="logo" />
            </Link>

            <div className={classes.contProf}>
                {
                    acc
                }
                <Link to='/Auth' className={classes.person}>
                    <img src="/person.png" alt="account" />
                </Link>
            </div>


        </header>
    );
}

export default HeaderMain;
import React, { useEffect, useState } from "react";
import styles from './Office.module.css';
import { Link, useNavigate } from "react-router-dom";

const Office = () => {
    const [click, setClick] = useState(true)
    const navigate = useNavigate();
    const [books, setBooks] = useState(//@ts-ignore
        JSON.parse(localStorage.getItem
            (
                //@ts-ignore
                JSON.parse(localStorage.getItem('currentAccount'))?.login
            )
        )?.books);

    useEffect(() => {
        //@ts-ignore
        if (JSON.parse(localStorage.getItem('currentAccount')) === null) {
            setBooks(
                //@ts-ignore
                JSON.parse(localStorage.getItem
                    (
                        //@ts-ignore
                        JSON.parse(localStorage.getItem('currentAccount'))?.login
                    )
                )?.books
            )
        }
    }, []);

    const handleDelBook = (name: string) => {
        if (localStorage.getItem('currentAccount') === null) {
            navigate("/Auth");
        } else {
            //@ts-ignore
            const lg = JSON.parse(localStorage.getItem('currentAccount')).login;
            //@ts-ignore
            const info = JSON.parse(localStorage.getItem(lg))
            //@ts-ignore
            const result = info.books.filter((word: object) => word.name != name);
            //@ts-ignore
            localStorage.setItem(`${info.login}`, JSON.stringify({ login: info.login, password: info.password, books: [...result] }))
            setBooks(result)
        }
    }


    return (
        <div className={styles.container}>
            <div>
                {
                    //@ts-ignore
                    JSON.parse(localStorage.getItem
                        (
                            //@ts-ignore
                            JSON.parse(localStorage.getItem('currentAccount')).login
                        )
                    ).login
                }
                <div>
                    Мои закладки
                </div>
                <div className={styles.pins}>
                    {
                        //@ts-ignore
                        books.map(({ name, id }) => (
                            <div key={name + id} className={styles.zakl}>
                                <Link className={styles.bookCard}  to={'/OneBook/:id/' + id}>
                                    {name}
                                </Link>
                                <button onClick={() => handleDelBook(name)}>УДАЛИТЬ</button>
                            </div>

                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Office;
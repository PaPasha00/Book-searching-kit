import styles from './OneBook.module.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getOneBookThunk } from '../../redux/booksReducer';
import Preloader from '../Preloader/Preloader';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const OneBook = () => {
    const navigate = useNavigate();
    const dispatch: any = useDispatch();
    const oneBook: any = useSelector((store: any) => store.booksData.oneBook);
    const getting: boolean = useSelector((store: any) => store.booksData.getting);

    let a = window.location.href;
    let url = new URL(a);

    useEffect(() => {
        dispatch(getOneBookThunk(url.pathname.slice(13)));
    }, []);

    const containerVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: { duration: 1.5 }
        },
    }

    const handleBook = (id: string, name: string) => {
        //@ts-ignore
        if (localStorage.getItem('currentAccount') === null) {
            navigate("/Auth");
        } else {
            //@ts-ignore
            const lg = JSON.parse(localStorage.getItem('currentAccount')).login;
            //@ts-ignore
            const info = JSON.parse(localStorage.getItem(lg))
            //@ts-ignore
            localStorage.setItem(`${info.login}`, JSON.stringify({login: info.login, password: info.password, books: [{id, name}, ...info.books]}))
        }
    }

    return (
        <div className={styles.cont}>
            {
                getting
                    ? <Preloader />
                    : <motion.div className={styles.container}
                        variants={containerVariants}
                        initial='hidden' animate='visible'>
                        <img src={oneBook.volumeInfo?.imageLinks?.smallThumbnail} alt="book" />

                        <button className={styles.pin} onClick={() => handleBook(url.pathname.slice(13), oneBook.volumeInfo?.title)}>
                            <img src='/pin.png' alt="pin"  />
                        </button>


                        <div className={styles.infoContainer}>
                            <h1>{oneBook.volumeInfo?.title}</h1>
                            <p>{oneBook.volumeInfo?.description}</p>
                            <p>{oneBook.volumeInfo?.publisher}</p>
                            <p>{oneBook.volumeInfo?.authors}</p>
                        </div>
                    </motion.div>
            }</div>
    );
}

export default OneBook;

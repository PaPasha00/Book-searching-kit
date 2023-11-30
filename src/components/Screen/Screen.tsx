import BookCard from '../BookCard/BookCard';
import styles from './Screen.module.css';
import { useSelector } from 'react-redux';
import Preloader from '../Preloader/Preloader';
import { getMoreBooksThunk } from '../../redux/booksReducer';
import { useDispatch } from 'react-redux';
import img from './../../i-love-reading.gif';
import { motion } from 'framer-motion';
import Header from '../Header/Header';
import Kit from '../Kit/Kit';

const Screen = () => {
    const { books, getting, counter } = useSelector((store: any) => store.booksData);
    const { title, type, order } = useSelector((store: any) => store.booksData.searchParams);
    const { startIndex, maxResults } = useSelector((store: any) => store.booksData);

    const dispatch: any = useDispatch();

    const getMoreBooks = () => {
        dispatch(getMoreBooksThunk(title, type, order, startIndex, maxResults))
    }

    const containerVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: { duration: 1.5 }
        },
    }

    return (
        <>{
            getting
                ? <Preloader />
                : <motion.div
                    variants={containerVariants}
                    initial='hidden' animate='visible'
                    className={styles.container}
                >
                    <Kit />
                    <Header  />



                    <div className={styles.containerBooks}>
                        <span className={styles.results}>
                            <h1>{counter} результатов</h1>
                        </span>
                        <div className={styles.booksContainer}>
                            {
                                books.map((book: any, index: number) => (
                                    <BookCard
                                        key={index}
                                        title={book?.volumeInfo?.title}
                                        authors={book?.volumeInfo?.authors}
                                        smallThumbnail={book?.volumeInfo?.imageLinks?.smallThumbnail}
                                        categories={book?.volumeInfo?.categories}
                                        id={book.id}
                                    />

                                ))
                            }
                        </div>
                        {
                            title
                                ? <button onClick={() => getMoreBooks()}>Еще книги</button>
                                : <></>
                        }
                    </div>


                </motion.div>
        } </>
    );
}

export default Screen;
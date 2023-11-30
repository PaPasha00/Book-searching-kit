import React from 'react';
import styles from './Header.module.css';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getBooksThunk } from '../../redux/booksReducer';
import { CATEGORIES, SORTED } from './HeaderInfo';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

// const svgVariants = {
//     hidden: { y: '-50vh', opacity: 0.5 },
//     visible: {
//         y: 0,
//         opacity: 1,
//         transition: { type: 'spring' }
//     },
// }
// const svgVariantsSecond = {
//     hidden: { y: '-50vh', },
//     visible: {
//         y: 0,
//         opacity: 1,
//         transition: { type: 'spring', delay: 1 }
//     },
// }

const Header = () => {
    const [inputTitle, setInputTitle] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<string>('all');
    const [sorted, setSorted] = useState<string>('relevance');

    let navigate = useNavigate();

    const { startIndex, maxResults } = useSelector((store: any) => store.booksData);

    const dispatch: any = useDispatch();

    const handleInputChange = (event: any) => {
        setInputTitle(event.target.value);
    };

    const selectCategories = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption(value);
    };
    const selectSorted = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSorted(value);
    };

    const getBooks = () => {
        navigate("/");
        dispatch(getBooksThunk(inputTitle, selectedOption, sorted, startIndex, maxResults))
    };

    return (
        <header id='search'  className={styles.container}>

            <motion.h1>
                Поиск книг
            </motion.h1>
            <motion.div 
                className={styles.inputArea}>
                <input
                    className={styles.inputText}
                    value={inputTitle}
                    onChange={handleInputChange} />
                {
                    inputTitle === ''
                        ? <button className={styles.button} onClick={() => alert('Введите данные поиска')}>Найти</button>
                        : <button className={styles.button} onClick={getBooks}>Найти</button>
                }

            </motion.div>

            <motion.div
                className={styles.selections}>
                <h2>Категории</h2>
                <select onChange={selectCategories} className={styles.inputText}>
                    {
                        CATEGORIES.map(({ position, name }) => (
                            <option key={name} className={styles.black} value={position}>{name}</option>
                        ))
                    }
                </select>

                <h2>Cортировка по</h2>
                <select onChange={selectSorted} className={styles.inputText}>
                    {
                        SORTED.map(({ position, name }) => (
                            <option key={name} className={styles.black} value={position}>{name}</option>
                        ))
                    }
                </select>
            </motion.div>
        </header>
    );
}

export default Header;

import React from 'react';
import styles from './BookCard.module.css';
import { Link } from 'react-router-dom';

type TBookCard = {
    title: string 
    authors: []
    smallThumbnail: string 
    categories: string 
    id: string
}

const BookCard = ({title, authors, smallThumbnail, categories, id}: TBookCard) => {
    return (
        <Link to={'/OneBook/:id/' + id} className={styles.container}>
            {
                smallThumbnail
                ? <img src={smallThumbnail} alt='title'/>
                : <></>
            }
            
            <span className={styles.tag}>{categories}</span>
            <span className={styles.name}>{title}</span>
            {
                authors
                ? authors.map(name => (
                    <span key={name}>{name}</span>
                ))
                : 'Автор неизвестен'
            }
        </Link>
    );
}

export default BookCard;

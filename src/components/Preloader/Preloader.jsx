import classes from './Preloader.module.css';

const Preloader = () => {
    return (
        <div className={classes.loaderContainer}>
            <img src='/book.png' alt="preloader" />
            Загрузка
        </div>
    );
}

export default Preloader;
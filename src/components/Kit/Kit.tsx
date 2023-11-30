import classes from './Kit.module.css';

const Kit = () => {
    return (
        <div className={classes.container}>
            <img src="/ki.png" alt="kit" />
            <a href="#search" className={classes.button}>Искать книги</a>
        </div>
    );
}

export default Kit;
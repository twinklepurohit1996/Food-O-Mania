import React from 'react';
import classes from './Spinner.css';

const Spinner = () => {
    return (
        <svg className={classes.Loader}>
            <circle cx="75" cy="75" r="15" />
            <circle cx="75" cy="75" r="30" />
            <circle cx="75" cy="75" r="45" />
            <circle cx="75" cy="75" r="60" />
        </svg>
    );
}

export default Spinner;
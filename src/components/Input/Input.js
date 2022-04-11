import React from 'react';
import classes from './Input.css';

const Input = (props) => {

    let inputClasses = [classes.Input]
    if (props.showError) {
        inputClasses.push(classes.Error)
    }

    return <input
        className={inputClasses.join(' ')}
        type={props.type}
        autoComplete={props.autoComplete}
        placeholder={props.placeholder}
        onChange={props.changed}
    />
}

export default Input;
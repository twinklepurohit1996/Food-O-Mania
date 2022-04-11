import React from 'react';
import classes from './Button.css';

const Button = (props) => {

    let attachedClasses = [classes.Button];
    if (props.className) {
        attachedClasses.push(props.className);
    }

    return (
        <button type={props.type} onClick={props.clicked} disabled={props.disabled} className={attachedClasses.join(' ')}>{props.name}</button>
    );
}

export default Button;
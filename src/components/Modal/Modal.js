import React, { Fragment } from 'react';

import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css'

const Modal = (props) => {

    let attachedClasses = [classes.Modal];
    if (props.show) {
        attachedClasses.push(classes.Open);
    }

    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.close} />
            <div className={attachedClasses.join(' ')}>
                {props.children}
            </div>
        </Fragment>
    )
}

export default Modal;
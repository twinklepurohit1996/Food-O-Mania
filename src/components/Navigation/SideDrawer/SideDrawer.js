import React, { Fragment } from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../Backdrop/Backdrop';
import background1 from '../../../assets/SideBar1.jpg';
//import background2 from '../../../assets/Sidebar2.jpg';
import classes from './SideDrawer.css';

const SideBar = (props) => {

    let attachedClasses = [classes.SideDrawer];
    if (props.sideDrawerOpen) {
        attachedClasses.push(classes.Open);
    } else {
        attachedClasses.push(classes.Close);
    }

    return (
        <Fragment>
            <Backdrop clicked={props.close} show={props.sideDrawerOpen} />
            <div className={attachedClasses.join(' ')} onClick={props.close}>
                <img src={background1} alt="smootie_bowl" />
                <NavigationItems />
            </div>
        </Fragment>

    )
}

export default SideBar;
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Menu from '../Menu/Menu';
import classes from './NavigationBar.css';

const NavigationBar = (props) => {

    const userId = useSelector(state => state.auth.userId);

    return (
        <div className={classes.NavigationBar}>
            <Menu clicked={props.open} />
            <h3>Food-o-mania</h3>
            <div className={classes.NavigationItems}>
                <NavLink to="/about-us" activeClassName={classes.active}>About Us</NavLink>
                {userId ?
                    <NavLink to="/logout" activeClassName={classes.active}>Logout</NavLink> :
                    <NavLink to="/auth" activeClassName={classes.active}>Login</NavLink>
                }
            </div>
        </div >
    );
}

export default NavigationBar;
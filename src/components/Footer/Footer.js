import React from 'react';
import classes from './Footer.css';

const Footer = (props) => {
    return (
        <footer className={classes.Footer}>

            <i className="fab fa-twitter footer-icons"></i>
            <i className="fab fa-facebook-f footer-icons"></i>
            <i className="fab fa-instagram footer-icons"></i>
            <i className="fas fa-envelope footer-icons"></i>

            <p>Made with <i className="far fa-heart" style={{ color: 'rgb(253, 75, 75)', margin: 'auto' }}></i> in India</p>
            <p>All the <i className="far fa-copyright" style={{ fontSize: 'small', margin: 'auto' }}></i> Copyrights are reserved by Food-o-Mania</p>

        </footer>
    );
}

export default Footer;
import React from 'react';
import classes from './Home.css';
import Chef from '../../assets/Chef.svg';
import Yoga from '../../assets/yoga.svg';

const Home = (props) => {
    return (
        <div className={classes.Home}>

            <div className={classes.header}>
                <img src={Yoga} alt="yoga" className={classes.svg1} />
                <div className={classes.websiteIntro}>
                    <h1>Food-o-mania</h1>
                    <p>Welcome to the most amazing spot for the foodies!!</p>
                    <p>We take care that you not only eat good but also stay fit.</p>
                </div>
                <img src={Chef} alt="chef" className={classes.svg2} />
            </div>

            <div className={classes.services}>
                <h1>Our Services</h1>
                <div>
                    <p>Tremendous recipe database</p>
                    <p>Effective Meal Planner</p>
                    <p>Supportive Community</p>
                    <p>Interactive User Interface</p>
                </div>

            </div>

        </div>
    );
}

export default Home;
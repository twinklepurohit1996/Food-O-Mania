import React from 'react';

import Footer from '../Footer/Footer';
import headerImage from '../../assets/food.jpg';
import classes from './AboutUs.css';

const AboutUs = (props) => {

    return (
        <div className={classes.AboutUs}>
            <div className={classes.header}>
                <div style={{ backgroundImage: `url(${headerImage})` }} className={classes.Image}></div>
                <div className={classes.Content}>
                    <h2>Welcome to Food-o-mania!!</h2>
                    <p>A safe space for all the foodies and fitness freaks</p>
                    <p>We promote healthy and happy lifestyle</p>
                </div>
            </div>
            <div className={classes.Mission}>
                <h1>Our Mission</h1>
                <p><strong>To make eating easy: </strong>With our quick and effective meal planners you no langer have to spend hours calculating calories in your diet for a day. We generate meal plans within seconds for you using the tremendous databases of Spoonacular.</p>
                <p><strong>To help our users live planned life: </strong>Food-o-mania allows you to plan your future meals and save them so that able to operate in a well-planned manner without any chaos.</p>
                <p><strong>To provide users with supportive community: </strong>We have extremly supportive community. You can post your progress and show it to the others. Also seeing others incoprating healthy living habits in their life just like you helps you to stay motivated.
                </p>
            </div>

            <Footer />
        </div >
    )
}

export default AboutUs;
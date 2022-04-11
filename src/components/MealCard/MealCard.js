import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteUserDiet } from '../../store/actions/index'
import classes from './MealCard.css';

const MealCard = (props) => {

    const dispatch = useDispatch()
    const userId = useSelector(state => state.auth.userId)
    const deleteDiet = (dietId, userId) => {
        dispatch(deleteUserDiet(dietId, userId))
    }

    return (
        <div className={classes.MealCard}>
            <div className={classes.title}>
                <p>{props.mealTitle}</p>
                <p>{props.mealDay}</p>
            </div>
            <div className={classes.diet}>
                {
                    props.meals.map(meal => (
                        <div key={meal.id} className={classes.meal}>
                            <img src={'https://spoonacular.com/recipeImages/' + meal.id + '-556x370.' + meal.imageType} alt="dish_image" />
                            <div className={classes.mealInfo}>
                                <p>{meal.title}</p>
                                <p>Servings: {meal.servings}</p>
                                <p>Prepration Time: {meal.readyInMinutes} mins</p>
                                <Link to={'/recipe/' + meal.id + '/' + encodeURIComponent(meal.sourceUrl)}>
                                    Click to view recipe
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                <button className={classes.deleteButton} onClick={() => deleteDiet(props.id, userId)}>DELETE</button>
            </div>
        </div>
    );
}

export default MealCard;
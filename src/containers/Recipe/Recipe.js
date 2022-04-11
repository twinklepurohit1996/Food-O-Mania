import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import Spinner from '../../components/Spinner/Spinner'
import { getRecipe } from '../../store/actions/index';
import classes from './Recipe.css';

const Recipe = (props) => {

    const { url } = useParams();
    const dispatch = useDispatch();
    const recipe = useSelector(state => state.dir.recipe);
    const loading = useSelector(state => state.dir.loading);
    const error = useSelector(state => state.dir.error);

    useEffect(() => {
        dispatch(getRecipe(url));
    }, [dispatch, url]);

    return (
        <div className={classes.Recipe}>
            {recipe ? (
                <>
                    <h3>{recipe.title}</h3>
                    <div className={classes.header}>
                        <img src={recipe.image} alt="recipe_img" />
                        <div className={classes.ings}>
                            <p className={classes.title}>Ingredients</p>
                            <ul>
                                {recipe.extendedIngredients.map(ing => <li key={ing.originalString}>{ing.originalString}</li>)}
                            </ul>
                        </div>
                    </div>
                    <div className={classes.instructions}>
                        <p>Recipe</p>
                        <ol>
                            {recipe.analyzedInstructions[0].steps.map(ins => <li key={ins.number}>{ins.step}</li>)}
                        </ol>
                    </div>
                </>
            )
                : (loading ? <Spinner /> : <p className={classes.error}>{error}</p>)
            }
        </div>
    );
}

export default Recipe;
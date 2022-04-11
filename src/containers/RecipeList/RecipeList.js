import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Spinner from '../../components/Spinner/Spinner';
import FoodCard from '../../components/FoodCard/FoodCard'
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Footer from '../../components/Footer/Footer';
import Background from '../../assets/2614486.jpg';
import { setSearchValue, autocompleteRecipes, complexRecipeSearch, getRandomRecipes } from '../../store/actions/index'
import classes from './RecipeList.css';

const RecipeList = (props) => {

    const dispatch = useDispatch();
    const loading = useSelector(state => state.recipe.loading);
    const searchValue = useSelector(state => state.recipe.searchValue);
    const recipes = useSelector(state => state.recipe.recipes);

    useEffect(() => {
        if (recipes.length === 0) {
            dispatch(getRandomRecipes());
        }
    }, [dispatch, recipes.length]);

    const valueChangeHandler = (event) => {

        dispatch(setSearchValue(event.target.value));
        if (event.target.value === '') {
            dispatch(getRandomRecipes());
        } else {
            dispatch(autocompleteRecipes(event.target.value));
        }

    }

    const searchHandler = (searchValue) => {
        dispatch(complexRecipeSearch(searchValue));
    }

    let output = <p style={{ color: 'rgb(92, 88, 88)', marginBottom: '137px' }}> No recipes found!!</p >
    if (loading) {
        output = <Spinner />
    }
    if (recipes.length > 0) {
        output = recipes.map(r => <FoodCard key={r.id} recipe={r} />);
    }

    return (
        <div className={classes.RecipeList}>
            <div className={classes.Image} style={{ backgroundImage: `url(${Background})` }}>
                <h5>Welcome to Food-o-mania!!</h5>
                <p>Favourite place for all the foodies</p>
                <Input type="text" placeholder="Search your favourite recipes" changed={valueChangeHandler} />
                <Button name="Search" clicked={() => searchHandler(searchValue)} />
            </div>
            <div className={classes.List}>
                {output}
            </div>
            <Footer />
        </div>
    );
}

export default RecipeList;
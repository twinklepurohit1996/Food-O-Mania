import * as actionTypes from '../actions/actionTypes';
import axios from '../../spoonacular-data-axios';

const API_KEY = '1e37a1ef70934d5884e2cea1bfb5fa9f';

export const setSearchValue = (searchValue) => {
    return {
        type: actionTypes.SET_SEARCH_VALUE,
        searchValue: searchValue
    }
}

export const fetchRecipesStart = () => {
    return {
        type: actionTypes.FETCH_RECIPES_START
    }
}

export const fetchRecipesSuccess = (recipes) => {
    return {
        type: actionTypes.FETCH_RECIPES_SUCCESS,
        recipes: recipes
    }
}

export const fetchRecipesFailed = () => {
    return {
        type: actionTypes.FETCH_RECIPES_FAILED
    }
}

export const getRandomRecipes = () => {
    return dispatch => {

        dispatch(fetchRecipesStart());
        axios.get('/recipes/random?number=10&tags=vegetarian&apiKey=' + API_KEY)
            .then(response => dispatch(fetchRecipesSuccess(response.data.recipes)))
            .catch(err => dispatch(fetchRecipesFailed()))

    }
}

export const autocompleteRecipes = (searchValue) => {
    return dispatch => {

        dispatch(fetchRecipesStart());
        axios.get('/recipes/autocomplete?number=10&query=' + searchValue + '&apiKey=' + API_KEY)
            .then(response => {

                dispatch(fetchRecipesSuccess(response.data))
            })
            .catch(err => dispatch(fetchRecipesFailed()))

    }
}

export const complexRecipeSearch = (searchValue) => {
    return dispatch => {

        dispatch(fetchRecipesStart());
        axios.get('/recipes/complexSearch?instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&query=' + searchValue + '&apiKey=' + API_KEY)
            .then(response => dispatch(fetchRecipesSuccess(response.data.results)))
            .catch(err => dispatch(fetchRecipesFailed()))

    }
}
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    recipe: null,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_VIEWED_RECIPE_START:
            return {
                ...state,
                loading: true,
                recipe: null,
                error: null
            }
        case actionTypes.FETCH_VIEWED_RECIPE_SUCCESS:
            return {
                ...state,
                loading: false,
                recipe: action.recipe
            }
        case actionTypes.FETCH_VIEWED_RECIPE_FAILED:
            return {
                ...state,
                loading: false,
                error: 'Unable to fetch the required recipe. Please try again later'
            }
        default: return state;

    }
}

export default reducer;
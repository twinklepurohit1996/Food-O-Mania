import * as actionTypes from '../actions/actionTypes';

const initialState = {
    recipes: [],
    searchValue: '',
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SEARCH_VALUE:
            return {
                ...state,
                searchValue: action.searchValue
            }
        case actionTypes.FETCH_RECIPES_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_RECIPES_SUCCESS:
            return {
                ...state,
                loading: false,
                recipes: action.recipes
            }
        case actionTypes.FETCH_RECIPES_FAILED:
            return {
                ...state,
                loading: false
            }
        default: return state;
    }
}

export default reducer;
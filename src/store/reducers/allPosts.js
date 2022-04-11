import * as actionTypes from '../actions/actionTypes';

const initialState = {
    posts: [],
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.START_FETCHING:
            return {
                ...state,
                error: null
            }
        case actionTypes.SET_POSTS:
            return {
                ...state,
                posts: action.posts
            }
        case actionTypes.SET_ERROR:
            return {
                ...state,
                error: action.error
            }
        default: return state;

    }
}

export default reducer;
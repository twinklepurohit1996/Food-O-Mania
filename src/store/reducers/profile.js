import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userData: null,
    userDiet: [],
    userPosts: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER_DATA:
            return {
                ...state,
                userData: action.data
            }
        case actionTypes.SET_USER_PHOTO:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    profilePic: action.data
                }
            }
        case actionTypes.SET_USER_DIET:
            return {
                ...state,
                userDiet: action.data
            }
        case actionTypes.SET_USER_POSTS:
            return {
                ...state,
                userPosts: action.posts
            }
        default: return state;
    }
}
export default reducer;
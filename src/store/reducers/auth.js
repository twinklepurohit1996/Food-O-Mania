import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userId: null,
    isSignup: false,
    loading: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SET_IS_SIGN_UP:
            return {
                ...state,
                isSignup: !state.isSignup,
                error: null
            }
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userId: action.userId
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.LOGOUT_USER:
            return {
                ...state,
                userId: null
            }
        default: return state;

    }
}

export default reducer;
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    meals: [],
    nutrients: '',
    loading: false,
    saveLoader: false,
    saveStatus: '',
    calories: 0,
    dietType: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.RESET_MEAL_PLANNER:
            return {
                ...state,
                meals: [],
                nutrients: '',
                loading: false,
                saveLoader: false,
                saveStatus: '',
                calories: 0,
                dietType: ''
            }
        case actionTypes.SET_CALORIES:
            return {
                ...state,
                calories: action.calories
            }
        case actionTypes.SET_DIET_TYPE:
            return {
                ...state,
                dietType: action.dietType
            }
        case actionTypes.SET_STATUS:
            return {
                ...state,
                saveStatus: action.status
            }
        case actionTypes.SET_LOADER:
            return {
                ...state,
                saveLoader: action.status
            }
        case actionTypes.FETCH_DIET_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_DIET_SUCCESS:
            return {
                ...state,
                loading: false,
                meals: action.meals,
                nutrients: action.nutrients
            }
        case actionTypes.FETCH_RECIPES_FAILED:
            return {
                ...state,
                loading: false
            }
        case actionTypes.SAVE_DIET_START:
            return {
                ...state,
                saveLoader: true
            }
        case actionTypes.SAVE_DIET_SUCCESS:
            return {
                ...state,
                saveLoader: false,
                saveStatus: action.status
            }
        case actionTypes.SAVE_DIET_FAILED:
            return {
                ...state,
                saveLoader: false,
                saveStatus: action.status
            }
        default: return state;
    }
}

export default reducer;

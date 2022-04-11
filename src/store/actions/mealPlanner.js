import * as actionTypes from '../actions/actionTypes';
import axios from '../../spoonacular-data-axios';
import { firestore } from '../../firebase';
//import firebase from 'firebase';

const API_KEY = '1e37a1ef70934d5884e2cea1bfb5fa9f';

export const reset = () => {
    return {
        type: actionTypes.RESET_MEAL_PLANNER
    }
}

export const setCalories = (calories) => {
    return {
        type: actionTypes.SET_CALORIES,
        calories: calories
    }
}

export const setDietType = (dietType) => {
    return {
        type: actionTypes.SET_DIET_TYPE,
        dietType: dietType
    }
}

export const setStatus = (status) => {
    return {
        type: actionTypes.SET_STATUS,
        status: status
    }
}

export const setLoader = (status) => {
    return {
        type: actionTypes.SET_LOADER,
        status: status
    }
}

export const fetchDietStart = () => {
    return {
        type: actionTypes.FETCH_DIET_START
    }
}

export const fetchDietSuccess = (meals, nutrients) => {
    return {
        type: actionTypes.FETCH_DIET_SUCCESS,
        meals: meals,
        nutrients: nutrients
    }
}

export const fetchDietFailed = () => {
    return {
        type: actionTypes.FETCH_DIET_FAILED
    }
}

export const saveDietStart = (status) => {
    return {
        type: actionTypes.SAVE_DIET_START
    }
}

export const saveDietSuccess = (status) => {
    return {
        type: actionTypes.SAVE_DIET_SUCCESS,
        status: status
    }
}

export const saveDietFailed = (status) => {
    return {
        type: actionTypes.SAVE_DIET_FAILED,
        status: status
    }
}

export const getMealPlan = (calories, dietType) => {
    return dispatch => {

        dispatch(fetchDietStart());
        let url = '/mealplanner/generate?timeFrame=day&targetCalories=' + calories + '&apiKey=' + API_KEY;
        if (dietType !== '') {
            url = url + '&diet=' + dietType;
        }
        if (dietType === 'vegetarian') {
            url = url + '&exclude=eggs';
        }
        axios.get(url)
            .then(res => dispatch(fetchDietSuccess(res.data.meals, res.data.nutrients)))
            .catch(err => dispatch(fetchDietFailed()))

    }
}

export const setMealOfTheDay = (userId, meals, mealTitle, mealDay) => {
    return dispatch => {

        dispatch(saveDietStart())
        //const tzoffset = (new Date()).getTimezoneOffset() * 60000;
        //const time = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5).replace("T", " ");
        firestore.collection('meals').add({
            userId: userId,
            mealTitle: mealTitle,
            mealDay: mealDay,
            meals: meals,
            timestamp: new Date()
        }).then(res => {
            dispatch(saveDietSuccess('success'))
        }).catch(err => {
            dispatch(saveDietFailed('failed'))
        })
    }
}
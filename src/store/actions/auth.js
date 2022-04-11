import * as actionTypes from './actionTypes';
import { auth, firestore } from '../../firebase';

export const setIsSignup = () => {
    return {
        type: actionTypes.SET_IS_SIGN_UP
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = () => {
    return {
        type: actionTypes.AUTH_SUCCESS
    }
}

export const loginSuccess = (userId) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        userId: userId
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const signUp = (name, email, password) => {
    return dispatch => {

        dispatch(authStart());
        auth.createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const { uid, email } = response.user;
                firestore.collection('users').add({
                    userId: uid,
                    name: name,
                    email: email,
                    profilePic: 'https://firebasestorage.googleapis.com/v0/b/food-o-mania.appspot.com/o/images%2FprofilePic.png?alt=media&token=8e4f22bd-4d1d-451e-bbca-6f2c0c636a03'
                })
                    .then((res) => {
                        dispatch(authSuccess());
                        dispatch(setIsSignup());
                    })
            })
            .catch(err => {
                dispatch(authFailed(err.message));
            })
    }
}

export const SignIn = (email, password) => {
    return dispatch => {

        dispatch(authStart());
        auth.signInWithEmailAndPassword(email, password)
            .then((res) => {
                dispatch(loginSuccess(res.user.uid))
            })
            .catch(err => dispatch(authFailed(err.message)))
    }
}

const logoutUser = () => {
    return {
        type: actionTypes.LOGOUT_USER
    }
}

export const logout = () => {
    return dispatch => {

        auth.signOut()
            .then(res => dispatch(logoutUser()))

    }
}
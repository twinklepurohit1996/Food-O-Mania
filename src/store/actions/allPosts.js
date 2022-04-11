import firebase from 'firebase/app';
import { firestore } from '../../firebase';
import * as actionTypes from './actionTypes';

export const startFetch = () => {
    return {
        type: actionTypes.START_FETCHING
    }
}

export const setPosts = (posts) => {
    return {
        type: actionTypes.SET_POSTS,
        posts: posts
    }
}

export const setError = (error) => {
    return {
        type: actionTypes.SET_ERROR,
        error: error
    }
}

export const fetchPosts = () => {
    return dispatch => {

        dispatch(startFetch());
        firestore.collection('posts')
            .orderBy("timestamp", "desc")
            .get()
            .then(res => {
                let posts = [];
                res.forEach(doc => posts.push(doc));
                dispatch(setPosts(posts));
            })
            .catch(err => setError(err));
    }
}

export const likePost = (postId, userId) => {
    return dispatch => {

        firestore.collection('posts').doc(postId).update({
            likes: firebase.firestore.FieldValue.arrayUnion(userId)
        }).then(res => dispatch(fetchPosts()));

    }
}

export const unlikePost = (postId, userId) => {
    return dispatch => {

        firestore.collection('posts').doc(postId).update({
            likes: firebase.firestore.FieldValue.arrayRemove(userId)
        }).then(res => dispatch(fetchPosts()));

    }
}


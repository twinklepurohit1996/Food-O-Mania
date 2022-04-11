import * as actionTypes from '../actions/actionTypes';
import { firestore, storage } from '../../firebase';

export const setUserData = (data) => {
    return {
        type: actionTypes.SET_USER_DATA,
        data: data
    }
}

export const setUserPhoto = (data) => {
    return {
        type: actionTypes.SET_USER_PHOTO,
        data: data
    }
}

export const setUserDiet = (data) => {
    return {
        type: actionTypes.SET_USER_DIET,
        data: data
    }
}

export const setUserPosts = (data) => {
    return {
        type: actionTypes.SET_USER_POSTS,
        posts: data
    }
}

export const getUserData = (userId) => {
    return dispatch => {

        firestore.collection('users').where('userId', '==', userId).get()
            .then(res => {
                let udata;
                res.forEach(doc => {
                    udata = doc.data();
                })
                dispatch(setUserData(udata));
            })
    }
}

export const getUserDiet = (userId) => {
    return dispatch => {

        firestore.collection('meals')
            .where('userId', '==', userId)
            .orderBy('timestamp', 'desc')
            .get()
            .then(res => {
                let dietList = []
                res.forEach(doc => {
                    dietList.push(doc)
                })
                dispatch(setUserDiet(dietList))
            })
    }
}

export const getUserPosts = (userId) => {
    return dispatch => {

        firestore.collection('posts')
            .where('userId', '==', userId)
            .orderBy('timestamp', 'desc')
            .get()
            .then(res => {
                let postList = []
                res.forEach(doc => {
                    postList.push(doc)
                })
                dispatch(setUserPosts(postList))
            })
    }
}

export const updateImage = (image, userId) => {
    return dispatch => {

        const uploadTask = storage.ref('images/' + image.name).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => { }, (error) => {
                alert('Image upload failed');
            }, () => {
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        firestore.collection('users').where('userId', '==', userId)
                            .get()
                            .then(res => {
                                res.forEach(doc => {
                                    doc.ref.update({
                                        profilePic: url
                                    }).then(res => {
                                        dispatch(setUserPhoto(url))
                                    })
                                })
                            })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            });
    }
}
export const deleteUserDiet = (dietId, userId) => {
    return dispatch => {
        firestore.collection('meals').doc(dietId).delete()
            .then((res) => {
                //console.log('success')
                dispatch(getUserDiet(userId))
            })
            .catch(err => {
                console.log(err);
            })
    }
}
export const deleteUserPost = (postId, userId) => {
    return dispatch => {
        firestore.collection('posts').doc(postId).delete()
            .then(res => {
                //console.log('success')
                dispatch(getUserPosts(userId))
            })
            .catch(err => {
                console.log(err);
            })
    }
}
import React, { useEffect, useState } from 'react';

import classes from './Post.css'
import { deleteUserPost, likePost, unlikePost } from '../../store/actions/index';
import { firestore } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const Post = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const loggedInUserId = useSelector(state => state.auth.userId);
    const [liked, setLiked] = useState(props.likes.find(e => e === loggedInUserId));

    useEffect(() => {
        firestore.collection('users').where('userId', '==', props.userId).get()
            .then(res => {
                res.forEach(doc => {
                    setUsername(doc.data().name);
                    setProfilePic(doc.data().profilePic);
                })
            });
    }, [props.userId]);

    const deletePost = (postId, userId) => {
        dispatch(deleteUserPost(postId, userId));
        history.push('/profile');
    }

    const like = (postId, userId) => {
        dispatch(likePost(postId, userId));
        setLiked(true);
    }

    const unlike = (postId, userId) => {
        dispatch(unlikePost(postId, userId));
        setLiked(false);
    }

    let icon = null;

    if (liked) {
        icon = <i
            className="fas fa-heart"
            style={{ color: 'red' }}
            onClick={() => unlike(props.postId, loggedInUserId)}
        ></i>
    } else {
        icon = <i
            className="far fa-heart"
            onClick={() => like(props.postId, loggedInUserId)}
        ></i>

    }

    return (
        <div className={classes.Post}>
            <div>
                <img className={classes.profilePic} src={profilePic} alt="profile_pic" />
                <p className={classes.name}>{username}</p>
                {props.userId === loggedInUserId ?
                    <i
                        className="far fa-trash-alt"
                        style={{ marginLeft: 'auto', cursor: 'pointer' }}
                        onClick={() => deletePost(props.postId, loggedInUserId)}
                    ></i> : null}
            </div>
            <img src={props.imageUrl} alt="post" />
            <div style={{ padding: '7px 0px 5px' }}>
                {icon}
            </div>
            <p className={classes.title}>{props.likes.length} likes</p>
            <p className={classes.title}>{props.title}</p>
            <p className={classes.content}>{props.content}</p>
        </div>
    )
}

export default Post;
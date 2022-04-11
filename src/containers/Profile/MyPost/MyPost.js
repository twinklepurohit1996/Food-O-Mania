import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Post from '../../Post/Post';
import { firestore } from '../../../firebase';
import classes from './MyPost.css';

const MyPost = props => {

    const { postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        firestore.collection('posts').doc(postId).get()
            .then(res => setPost(res.data()));
    });


    let output = null;
    if (post) {
        output = <Post
            title={post.title}
            content={post.content}
            imageUrl={post.imageURL}
            userId={post.userId}
            likes={post.likes}
            postId={postId}
        />
    }

    return <div className={classes.MyPost}>{output}</div>;
}

export default MyPost;
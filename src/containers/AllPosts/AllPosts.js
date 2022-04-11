import React, { useEffect } from 'react';

import Spinner from '../../components/Spinner/Spinner';
import Post from '../Post/Post';
import classes from './AllPosts.css';
import { fetchPosts } from '../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';

const AllPosts = (props) => {

    const dispatch = useDispatch();
    const posts = useSelector(state => state.allPosts.posts);
    const error = useSelector(state => state.allPosts.error);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    let output = <Spinner />
    if (error) {
        output = <p style={{ color: 'red', fontWeight: '600' }}>Failed to fetch the posts</p>
    }

    if (posts.length > 0) {
        output = posts.map(post =>
            <Post
                key={post.id}
                title={post.data().title}
                content={post.data().content}
                imageUrl={post.data().imageURL}
                userId={post.data().userId}
                likes={post.data().likes}
                postId={post.id}
            />
        )
    }

    return (
        <div className={classes.AllPosts}>
            {output}
        </div>
    )
}

export default AllPosts;
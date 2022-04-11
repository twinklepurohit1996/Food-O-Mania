import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Spinner from '../../components/Spinner/Spinner';
import classes from './AddPost.css';
import { firestore, storage } from '../../firebase';

const AddPost = (props) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const userId = useSelector(state => state.auth.userId);
    const history = useHistory();

    useEffect(() => {
        setError(null);
    }, []);

    const setTitleHandler = (event) => {
        setTitle(event.target.value)
    }

    const setImageHandler = (image) => {
        setImage(image)
    }

    const setContentHandler = (text) => {
        setContent(text)
    }

    const savePostHandler = (event, userId, title, image, content) => {

        event.preventDefault();
        setLoading(true);
        //dispatch(savePost(userId, title, image, content));
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
                        firestore.collection('posts').add({
                            userId: userId,
                            title: title,
                            imageURL: url,
                            content: content,
                            timestamp: new Date(),
                            likes: []
                        }).then(() => {
                            setLoading(false);
                            history.push('/community');
                        })
                    })
                    .catch(err => setError(err));
            });
    }

    let form = (
        <form onSubmit={event => savePostHandler(event, userId, title, image, content)}>
            <Input type="text" placeholder="Post Title" changed={setTitleHandler} />
            <textarea name='Enter Text Here...' rows='4' cols='50' placeholder="Write a caption.." onChange={e => setContentHandler(e.target.value)}></textarea>
            <input
                type="file"
                className={classes.inputFile}
                accept="image/png, image/jpeg"
                onChange={e => setImageHandler(e.target.files[0])}
            />
            <Button name="Submit" type="submit" />
            {error ? <p style={{ color: 'red', fontWeight: '600' }}>image upload failed</p> : null}
        </form>
    );

    if (loading) {
        form = <Spinner />
    }

    return (
        <div className={classes.FullPage}>
            <div className={classes.AddPost}>
                <h2>Create Post</h2>
                {form}
            </div>
        </div>
    );
}

export default AddPost;
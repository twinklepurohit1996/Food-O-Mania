import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import './Tabs.css';

import updatePic from '../../assets/new_upload.png';
import Spinner from '../../components/Spinner/Spinner';
import MealCard from '../../components/MealCard/MealCard';
import { getUserData, updateImage, getUserDiet, getUserPosts} from '../../store/actions/index';
import classes from './Profile.css';
import { useHistory } from 'react-router';

const Profile = (props) => {

    const hiddenImageInput = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const userData = useSelector(state => state.profile.userData);
    const userId = useSelector(state => state.auth.userId);
    const userDiet = useSelector(state => state.profile.userDiet);
    const userPosts = useSelector(state => state.profile.userPosts);

    useEffect(() => {
        dispatch(getUserData(userId));
        dispatch(getUserDiet(userId));
        dispatch(getUserPosts(userId));
    }, [dispatch, userId]);

    const uploadImage = (image, userId) => {
        dispatch(updateImage(image, userId));
    }

    const openPost = (postId) => {
        history.push('/post/' + postId)
    }

    let diets = <p style={{ color: 'gray' }}>You don't have any saved meal plans</p>
    if (userDiet.length > 0) {
        diets = userDiet.map(diet =>
            <MealCard
                key={diet.id}
                id={diet.id}
                mealTitle={diet.data().mealTitle}
                mealDay={diet.data().mealDay}
                meals={diet.data().meals}
            />
        )
    }

    let posts = <p style={{ color: 'gray' }}>Nothing posted yet</p>
    if (userPosts.length > 0) {
        posts = (
            <div style={{ width: '100%', maxWidth: '820px', margin: 'auto' }}>
                <div className={classes.gallery}>
                    {userPosts.map(post =>
                        <div className={classes.grid_image} key={post.id} onClick={() => openPost(post.id)}>
                            <img src={post.data().imageURL} alt="my_post" />
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className={classes.FullPage}>
            <div className={classes.Profile}>
                {userData ? (
                    <>
                        <div className={classes.header}>
                            <div className={classes.profilePic} onClick={() => hiddenImageInput.current.click()}>
                                <img src={userData.profilePic} alt="profile_pic" className={classes.image1} />
                                <img src={updatePic} alt="update_pic" className={classes.image2} />
                                <input
                                    type="file"
                                    name="filename"
                                    accept="image/png, image/jpeg"
                                    onChange={e => uploadImage(e.target.files[0], userId)}
                                    ref={hiddenImageInput}
                                />
                            </div>
                            <div>
                                <h1>{userData.name}</h1>
                                <p>{userData.email}</p>
                            </div>
                        </div>

                        <div style={{ width: '100%', maxWidth: '820px', margin: 'auto' }}>
                            <Tabs>
                                <TabList>
                                    <Tab>Posts</Tab>
                                    <Tab>Meals</Tab>
                                </TabList>

                                <TabPanels>
                                    <TabPanel>
                                        {posts}
                                    </TabPanel>
                                    <TabPanel>
                                        {diets}
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </div>
                    </>
                ) : <Spinner />}
            </div>
        </div>
    );
}

export default Profile;
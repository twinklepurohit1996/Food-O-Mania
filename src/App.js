import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import classes from './App.css';

import Layout from './containers/Layout/Layout';
import RecipeList from './containers/RecipeList/RecipeList'
import MealPlanner from './containers/MealPlanner/MealPlanner'
import Profile from './containers/Profile/Profile'
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Recipe from './containers/Recipe/Recipe';
import Home from './components/Home/Home';
import AddPost from './containers/AddPost/AddPost';
import AboutUs from './components/AboutUs/AboutUs';
import AllPosts from './containers/AllPosts/AllPosts';
import MyPost from './containers/Profile/MyPost/MyPost';
import { useSelector } from 'react-redux';

function App() {

  const userId = useSelector(state => state.auth.userId);

  let routes = (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route path='/recipe/:id/:url' component={Recipe} />
      <Route path='/search' exact component={RecipeList} />
      <Route path='/about-us' component={AboutUs} />
      <Route path='/' component={Home} />
      <Redirect to='/' />
    </Switch>
  );

  if (userId) {
    routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/meal-planner' component={MealPlanner} />
        <Route path='/logout' component={Logout} />
        <Route path='/recipe/:id/:url' component={Recipe} />
        <Route path='/search' exact component={RecipeList} />
        <Route path='/profile' component={Profile} />
        <Route path='/create-post' component={AddPost} />
        <Route path='/post/:postId' component={MyPost} />
        <Route path='/about-us' component={AboutUs} />
        <Route path='/community' component={AllPosts} />
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <div className={classes.App}>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

export default App;
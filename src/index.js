import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import recipesReducer from './store/reducers/recipes';
import mealPlannerReducer from './store/reducers/mealPlanner';
import authReducer from './store/reducers/auth';
import directionsReducer from './store/reducers/directions';
import ProfileReducer from './store/reducers/profile';
import AllPostsReducer from './store/reducers/allPosts';

const reducer = combineReducers({
  recipe: recipesReducer,
  mealPlanner: mealPlannerReducer,
  auth: authReducer,
  dir: directionsReducer,
  profile: ProfileReducer,
  allPosts: AllPostsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import { setIsSignup, signUp, SignIn } from '../../store/actions/index'
import classes from './Auth.css';


const Auth = (props) => {

    const dispatch = useDispatch();
    const isSignup = useSelector(state => state.auth.isSignup);
    const error = useSelector(state => state.auth.error);
    const loading = useSelector(state => state.auth.loading);
    const userId = useSelector(state => state.auth.userId);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const createAccountHandler = (event, name, email, password) => {
        event.preventDefault();
        dispatch(signUp(name, email, password));

    }

    const loginHandler = (event, email, password) => {
        event.preventDefault();
        dispatch(SignIn(email, password));
    }


    let form = (
        <>
            <form onSubmit={(event) => loginHandler(event, email, password)}>
                <Input type="text" placeholder="Email" changed={(event) => setEmail(event.target.value)} />
                <Input type="password" placeholder="Password" autoComplete="on" changed={(event) => setPassword(event.target.value)} />
                <Button type="submit" name="Sign In" />
                {error ? <p className={classes.error}>{error}</p> : null}
            </form>
            <p>New User?<span onClick={() => dispatch(setIsSignup())} style={{ color: 'rgb(69, 157, 216)', fontWeight: '600', cursor: 'pointer' }}> Create account</span></p>
        </>
    );


    if (isSignup) {
        form = (
            <>
                <form onSubmit={(event) => createAccountHandler(event, name, email, password)}>

                    <Input type="text" placeholder="Name" changed={(event) => setName(event.target.value)} />
                    <Input type="text" placeholder="Email" changed={(event) => setEmail(event.target.value)} />
                    <Input type="password" placeholder="Password" autoComplete="on" changed={(event) => setPassword(event.target.value)} />
                    <Button type="submit" name="Sign Up" />
                    {error ? <p className={classes.error}>{error}</p> : null}
                </form>
                <p>Already have account?<span onClick={() => dispatch(setIsSignup())} style={{ color: 'rgb(69, 157, 216)', fontWeight: '600', cursor: 'pointer' }}> Sign In</span></p>
            </>
        );
    }

    if (loading) {
        form = <Spinner />
    }


    return (
        <>
            {userId ? <Redirect to='/search' /> : null}
            <div className={classes.FullPage}>
                <div className={classes.Auth}>
                    <h2>Food-o-mania</h2>
                    {form}
                </div>
            </div>
        </>
    );
}

export default Auth;
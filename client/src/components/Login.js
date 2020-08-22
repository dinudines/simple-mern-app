import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, TextField, FormControl } from '@material-ui/core';
import ErrorList from '../utils/errorList';
import { LOGIN, FIELD, SUCCESS, ERROR } from '../actions/loginActions';
import { login } from '../services/authService';
import { ERROR_MESSAGE } from '../constants';

const Login = () => {

    const state = useSelector(state => state.login, shallowEqual);
    const { email, password, isLoading, isLoggedIn, errors } = state;

    const dispatch = useDispatch();

    if (isLoggedIn) {
        window.location.reload();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: LOGIN });
        
        login(email, password)
            .then(res => {
                if (res && res.status) {
                    dispatch({ type: SUCCESS });
                } else if (res && res.data.errors) {
                    const errorsList = res.data.errors.map(error => {
                        return error.msg;
                    });
                    dispatch({ type: ERROR, errors: errorsList });
                } else if(res) {
                    dispatch({ type: ERROR, errors: [res.message] });
                } else {
                    dispatch({ type: ERROR, errors: [ERROR_MESSAGE] });
                }
            });
    };

    const onChange = (field, value) => {
        dispatch({type: FIELD, field: field, value: value})
    }
    
    return (
        <div className='Container'>
            <h2> Welcome back, Please Login </h2>
            <form className='loginForm' autoComplete='off' onSubmit={onSubmit}>
                <FormControl fullWidth>
                    <TextField
                        id='email'
                        type='email'
                        label='Email*'
                        variant='outlined'
                        color='primary'
                        value={email}
                        aria-describedby='my-email-id'
                        onChange={(e) => onChange('email', e.target.value)}
                    />
                    <TextField
                        className='marginTop1'
                        id='password'
                        type='password'
                        label='Password*'
                        variant='outlined'
                        color='primary'
                        value={password}
                        aria-describedby='my-password'
                        onChange={(e) =>  onChange('password', e.target.value)}
                    />
                </FormControl>
                {errors.length > 0 && <p className='error'> <ErrorList errors={errors}/> </p> }
                <Button
                    className='marginTop1'
                    variant='contained'
                    color='primary'
                    onClick= {onSubmit}
                    disabled={isLoading}
                > 
                    {isLoading ? 'Loading...' : 'Login'}
                </Button>
                <p> Don't have an account? <Link to='/signup'> Signup here </Link></p>
            </form>
        </div>
    )
}

export default Login;

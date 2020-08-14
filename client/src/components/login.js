import React, { useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ErrorList from '../utils/errorList';
import { LOGIN, FIELD, SUCCESS, ERROR } from '../actions/loginActions';
import { StateContext, DispatchContext } from './home';
import { LOGIN_API_URL } from '../constants';
import { Button, TextField, FormControl } from '@material-ui/core';

const Login = () => {

    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    const { isLoading, email, password, errors } = state;

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        };
        dispatch({ type: LOGIN });
        axios.post(LOGIN_API_URL, data)
        .then(res => {
            const response = res.data;
            if (response.status) {
                dispatch({ type: SUCCESS });
            } else {
                if (response.data.errors) {
                    const errorsList = response.data.errors.map(error => {
                        return error.msg;
                    });
                    dispatch({ type: ERROR, errors: errorsList });
                } else {
                    dispatch({ type: ERROR, errors: [response.message] });
                }
            }
        })
        .catch(e => {
            dispatch({ type: ERROR, errors: ['Something went wrong.Please try after sometime.'] });
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

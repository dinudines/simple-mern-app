import React, { useContext } from 'react';
import axios from 'axios';
import { StateContext, DispatchContext } from './home';
import { LOGIN_API } from '../constants';
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
        dispatch({ type: 'LOGIN' });
        axios.post(LOGIN_API, data)
        .then(res => {
            const response = res.data;
            if (response.status) {
                dispatch({ type: 'SUCCESS' });
            } else {
                if (response.data.errors) {
                    const errorsList = response.data.errors.map(error => {
                        return error.msg;
                    });
                    dispatch({ type: 'ERROR', errors: errorsList });
                } else {
                    dispatch({ type: 'ERROR', errors: [response.message] });
                }
            }
        })
        .catch(e => {
            dispatch({ type: 'ERROR', errors: [e.description] });
        });
        
    };

    const onChange = (field, value) => {
        dispatch({type: 'FIELD', field: field, value: value})
    }

    const errorsList = errors.map((error, index) => {
        return <li key={index}> {error} </li>
    });
    
    return (
        <div className='Login'>
            <h2> Welcome back, Please Login </h2>
            <form className='loginForm' autoComplete='off' onSubmit={onSubmit}>
                <FormControl fullWidth>
                    <TextField
                        id='email'
                        label='Email'
                        variant='outlined'
                        color='primary'
                        value={email}
                        onChange={(e) => onChange('email', e.target.value)}
                    />
                    <TextField
                        className='marginTop1'
                        id='password'
                        type='password'
                        label='Password'
                        variant='outlined'
                        color='primary'
                        value={password}
                        onChange={(e) =>  onChange('password', e.target.value)}
                    />
                </FormControl>
                { errors.length > 0 && <p className='error'> {errorsList} </p> }
                <Button
                    className='marginTop1'
                    variant='contained'
                    color='primary'
                    onClick= {onSubmit}
                    disabled={isLoading}
                > 
                    {isLoading ? 'Loading...' : 'Login'}
                </Button>
            </form>
        </div>
    )
}

export default Login;
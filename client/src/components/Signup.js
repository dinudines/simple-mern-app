import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, TextField, FormControl } from '@material-ui/core';
import ErrorList from '../utils/errorList';
import { signup } from '../services/authService';
import { SIGNUP, FIELD, SUCCESS, ERROR } from '../actions/signupActions';
import { ERROR_MESSAGE } from '../constants';

const Signup = () => {
    
    const state = useSelector(state => state.signup, shallowEqual);
    const { firstName, lastName, email, password, isLoading, errors, isLoggedIn } = state;

    const dispatch = useDispatch();

    const onChange = (field, value) => {
        dispatch({ type: FIELD, field: field, value: value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: SIGNUP });

        signup(firstName, lastName, email, password)
            .then(res => {
                console.log(" res :", res);
                if (res && res.status) {
                    dispatch({ type: SUCCESS });
                } else {
                    if (res && res.data.errors) {
                        const errorsList = res.data.errors.map(error => {
                            return error.msg;
                        });
                        dispatch({ type: ERROR, errors: errorsList });
                    } else {
                        dispatch({ type: ERROR, errors: [ERROR_MESSAGE] });
                    }
                }
            });
    }
    return (
        isLoggedIn ? <Redirect to='/' /> :
        <div className='Container'>
            <h2> Welcome, Please fill in the details </h2>
            <form className='signupForm' autoComplete='off' onSubmit={onSubmit}>
                <FormControl fullWidth>
                    <TextField
                        id='firstName'
                        type='text'
                        label='First Name*'
                        variant='outlined'
                        color='primary'
                        value={firstName}
                        autoComplete='off'
                        aria-describedby='my-first-name'
                        onChange={(e) => onChange('firstName', e.target.value)}
                    />
                    <TextField
                        className='marginTop1'
                        id='lastName'
                        type='text'
                        label='Last Name'
                        variant='outlined'
                        color='primary'
                        value={lastName}
                        autoComplete="off"
                        aria-describedby='my-last-name'
                        onChange={(e) => onChange('lastName', e.target.value)}
                    />
                    <TextField
                        className='marginTop1'
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
                    {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
                <p> Already have an account? <Link to='/'> Login here </Link></p>
            </form>
        </div>
    )
}

export default Signup;

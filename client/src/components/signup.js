import React, { useReducer } from 'react';
import axios from 'axios';
import ErrorList from '../utils/errorList';
import signupReducer from '../reducers/loginReducer';
import initialState from '../store/initialState';
import { SIGNUP_API_URL } from '../constants';
import { SIGNUP, FIELD, SUCCESS, ERROR} from '../actions/signupActions';
import { Link } from 'react-router-dom';
import { Button, TextField, FormControl } from '@material-ui/core';

const Signup = () => {
    
    const [state, dispatch] = useReducer(signupReducer,initialState);

    const { firstName, lastName, email, password, isLoading, errors } = state;

    const onChange = (field, value) => {
        dispatch({ type: FIELD, field: field, value: value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            firstName,
            lastName,
            email,
            password
        };
        dispatch({ type: SIGNUP });
        axios.post(SIGNUP_API_URL, data)
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
    }
    return (
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

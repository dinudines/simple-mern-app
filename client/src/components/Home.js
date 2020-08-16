import React, { useReducer, createContext } from 'react';
import { Button } from '@material-ui/core';
import Login from './Login';
import initialState from '../store/initialState';
import loginReducer from '../reducers/loginReducer';
import { logout } from '../services/authService';
import { getCurrentUser } from '../services/authService';

export const DispatchContext = createContext();
export const StateContext = createContext();

const Home = () => {
    const [state, dispatch] = useReducer(loginReducer, initialState);

    const currentUser = getCurrentUser();

    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    return (
        <div>
            {currentUser 
                ? <div className='Container'>
                    <h1> Home Page </h1>
                    <h2> welcome, {currentUser.firstName} {currentUser.lastName} </h2>
                    <Button
                         variant='contained'
                        color='secondary'
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                  </div>
                : (
                    <DispatchContext.Provider value={dispatch}>
                        <StateContext.Provider value={state}>
                            <Login />
                        </StateContext.Provider>
                    </DispatchContext.Provider>
                )
            }
        </div>
    )
};

export default Home;

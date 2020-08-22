import React from 'react';
import { Button } from '@material-ui/core';
import Login from './Login';
import { logout } from '../services/authService';
import { getCurrentUser } from '../services/authService';

const Home = () => {
    
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
                : 
                 <Login />
            }
        </div>
    )
};

export default Home;

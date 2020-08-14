import React, { useReducer, createContext } from 'react';
import Login from './login';
import initialState from '../store/initialState';
import loginReducer from '../reducers/loginReducer';

export const DispatchContext = createContext();
export const StateContext = createContext();

const Home = () => {
    const [state, dispatch] = useReducer(loginReducer, initialState);
    const { isLoggedIn } = state;

    return (
        <div>
            {isLoggedIn 
                ? <h1> Home Page </h1>
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

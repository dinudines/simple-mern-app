import axios from 'axios';
import { LOGIN_API_ENDPOINT, SIGNUP_API_ENDPOINT } from '../constants';

export const signup = (firstName, lastName, email, password) => {
  return axios
    .post(SIGNUP_API_ENDPOINT, {
      firstName,
      lastName,
      email,
      password,
    })
    .then(response => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      return response.data;
   })
   .catch(e => {
     return false;
   });
};

export const login = (email, password) => {
  return axios
    .post(LOGIN_API_ENDPOINT, {
      email,
      password,
    })
    .then(response => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      return response.data;
    })
    .catch(e => {
      return false;
    });
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

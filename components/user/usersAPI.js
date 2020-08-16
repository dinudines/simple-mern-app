const express = require('express');
const router = express.Router();
const validator = require('./usersValidation');
const { getUsers, signup, login } = require('./usersController');

/*
** @route GET /api/users
** @description Get all users
** @public false
*/
router.get('/', getUsers);


/*
** @route POST /api/users
** @description Create a user
** @public true
*/
router.post('/signup', validator.signup, signup);

/*
** @route POST /api/users/login
** @description Login user
** @public true
*/
router.post('/login', validator.login, login);

module.exports = router;

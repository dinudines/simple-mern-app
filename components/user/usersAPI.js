const express = require('express');
const router = express.Router();
const validator = require('./userValidation');
const { getUsers, createUser } = require('./usersController');

/*
** @route GET /api/users
** @description Get all users
** @public True
*/
router.get('/', getUsers);


/*
** @route POST /api/users
** @description Create a user
** @public True
*/
router.post('/', validator.createUser ,createUser);

module.exports = router;

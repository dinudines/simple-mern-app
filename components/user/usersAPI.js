const express = require('express');
const router = express.Router();
const { } = require('./usersController');

/*
** @route GET /api/users
** @description Get all users
** @public True
*/
router.get('/', (req, res) => {
    res.json({ status: true, users: [] });
});


/*
** @route POST /api/users
** @description Create a user
** @public True
*/
router.post('/', (req, res) => {
    res.json({ status: true, user: req.body.user });
});

module.exports = router;

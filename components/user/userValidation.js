const { check } = require('express-validator');

module.exports = {
    createUser: [
        check('user.firstName').not().isEmpty().withMessage('First Name is required.'),
        check('user.email').isEmail().withMessage('Email id is invalid.'),
        check('user.password').isLength({min: 8}).withMessage('Password must be atleast 8 characters.'),
    ],
    login: [
        check('email').isEmail().withMessage('Email id is invalid.'),
        check('password').isLength({min: 8}).withMessage('Password must be atleast 8 characters.'),
    ]
};
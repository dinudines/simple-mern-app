const { all, add, findByEmail } = require('./usersService');
const { validationResult } = require('express-validator');
const { successHandler, errorhandler } = require('../utils/requestHandler');
const { SERVER_ERROR_MESSAGE,
    SIGNUP_SUCCESSFUL_MESSAGE,
    LOGIN_UNSUCCESSFUL_MESSAGE,
    LOGIN_SUCCESSFUL_MESSAGE,
    LOGIN_PASSWORD_FAILED
} = require('../../constants');

const usersController = {
    getUsers: async (req, res) => {
        try {
            const users = await all();
            successHandler(res, undefined, { users });
        } catch (e) {
            errorhandler(res, undefined, e);
        }
    },
    signup: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return errorhandler(res, undefined, { errors : errors.array() });
            }

            const user = await add(req.body.user);

            successHandler(res, SIGNUP_SUCCESSFUL_MESSAGE, {user : user});
        } catch (e) {
            errorhandler(res, undefined, e);
        }
    },
    login: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return errorhandler(res, undefined, { errors : errors.array() });
            }

            const { email, password } = req.body;

            const user = await findByEmail(email);

            if (user) {

                const isMatch = await user.comparePassword(password);

                if (isMatch) {
                    successHandler(res, LOGIN_SUCCESSFUL_MESSAGE);
                } else {
                    errorhandler(res, LOGIN_PASSWORD_FAILED);
                }
            } else {
                errorhandler(res, LOGIN_UNSUCCESSFUL_MESSAGE);
            }
        } catch (e) {
            errorhandler(res, undefined, e);
        }
    }
};

module.exports = usersController;
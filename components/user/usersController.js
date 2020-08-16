const { all, add, findByEmail } = require('./usersService');
const { validationResult } = require('express-validator');
const { successHandler, errorhandler } = require('../utils/requestHandler');
const { getToken, verifyToken } = require('../utils/jwtHelper');
const {
    SIGNUP_SUCCESSFUL_MESSAGE,
    LOGIN_UNSUCCESSFUL_MESSAGE,
    LOGIN_SUCCESSFUL_MESSAGE,
    LOGIN_PASSWORD_FAILED,
    SIGNUP_EXISTING_USER_MESSAGE
} = require('../../constants');

const usersController = {
    getUsers: async (req, res) => {
        try {
            const users = await all();
            successHandler(res, undefined, undefined, { users });
        } catch (e) {
            errorhandler(req, res, undefined, e);
        }
    },
    signup: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return errorhandler(req, res, undefined, { errors : errors.array() });
            }

            const { email } = req.body;
            
            const user = await findByEmail(email);

            if (!user) {
                const newUser = await add(req.body);
                
                const token = getToken({
                    id: newUser._id,
                    email: newUser.email
                });

                successHandler(res, token, SIGNUP_SUCCESSFUL_MESSAGE, newUser.getInfo());
            } else {
                errorhandler(req, res, SIGNUP_EXISTING_USER_MESSAGE, undefined);
            }
        } catch (e) {
            errorhandler(req, res, undefined, e);
        }
    },
    login: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return errorhandler(req, res, undefined, { errors : errors.array() });
            }

            const { email, password } = req.body;

            const user = await findByEmail(email);

            if (user) {

                const isMatch = await user.comparePassword(password);

                if (isMatch) {

                    const token = getToken({
                        id: user._id,
                        email: user.email
                    });

                    successHandler(res, token, LOGIN_SUCCESSFUL_MESSAGE, user.getInfo());
                } else {
                    errorhandler(req, res, LOGIN_PASSWORD_FAILED);
                }
            } else {
                errorhandler(req, res, LOGIN_UNSUCCESSFUL_MESSAGE);
            }
        } catch (e) {
            errorhandler(req, res, undefined, e);
        }
    }
};

module.exports = usersController;
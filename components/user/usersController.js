const { all, add, findByEmail } = require('./usersService');
const { validationResult } = require('express-validator');
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
            if (users) {
                res.json({
                    status: true,
                    users
                });
            } else {
                res.json({
                    status: false,
                    message: SERVER_ERROR_MESSAGE
                });
            }
        } catch (e) {
            res.json({
                status: false,
                message: SERVER_ERROR_MESSAGE
            });
        }
    },
    signup: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.json({ status: false, error: errors.array() });
            }

            const user = await add(req.body.user);
            
            res.json({
                status: true,
                message: SIGNUP_SUCCESSFUL_MESSAGE
            });
        } catch (e) {
            res.json({
                status: false,
                message: SERVER_ERROR_MESSAGE
            });
        }
    },
    login: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.json({ status: false, error: errors.array() });
            }

            const { email, password } = req.body;

            const user = await findByEmail(email);

            if (user) {

                const isMatch = await user.comparePassword(password);

                if (isMatch) {
                    res.json({
                        status: true,
                        message: LOGIN_SUCCESSFUL_MESSAGE
                    });
                } else {
                    res.json({
                        status: false,
                        message: LOGIN_PASSWORD_FAILED
                    });
                }
            } else {
                res.json({
                    status: false,
                    message: LOGIN_UNSUCCESSFUL_MESSAGE
                });
            }
        } catch (e) {
            res.json({
                status: false,
                message: SERVER_ERROR_MESSAGE
            });
        }
    }
};

module.exports = usersController;
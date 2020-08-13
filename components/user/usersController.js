const { all, add } = require('./usersService');
const { validationResult } = require('express-validator');
const { SERVER_ERROR_MESSAGE } = require('../../constants');

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
    createUser: async (req, res) => {
        try {
            
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.json({ status: false, error: errors.array() });
            }

            const user = await add(req.body.user);
            res.json({
                status: true,
                message: user
            });
        } catch (e) {
            res.json({
                status: false,
                message: SERVER_ERROR_MESSAGE
            });
        }
    }
};

module.exports = usersController;
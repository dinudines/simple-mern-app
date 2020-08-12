const { getAll } = require('./usersService');

const usersController = {
    getAllUsers: async function (req, res) {
        try {
            const users = await getAll();
            if (users) {
                res.json({
                    status: true,
                    users
                });
            } else {
                res.json({
                    status: false,
                    message: 'Something went wrong.'
                });
            }
        } catch (e) {
            res.json({
                status: false,
                message: 'Something went wrong.'
            });
        }
    }
};

module.exports = usersController;
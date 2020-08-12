const User = require('./User');

const usersService = {
    getAll: async function () {
        try {
            return await User.find();
        } catch (e) {
            return false;
        }
    }
};

module.exports = usersService;
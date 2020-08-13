const User = require('./User');

const usersService = {
    all: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await User.find()
                resolve(users);
            } catch (e) {
                reject(e);
            }
        });
    },

    add: ({ firstName, lastName, email, password }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = new User({
                    firstName,
                    lastName,
                    email,
                    password
                });
                await user.save();
                resolve(user);
            } catch (e) {
                reject(e);
            }
        });
    }
};

module.exports = usersService;
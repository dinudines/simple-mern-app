const { SERVER_ERROR_MESSAGE } = require('../../constants');
const { successLogger, errorLogger} = require('./logger');

const requestHandler = {

    successHandler: (res, message = 'Success', data = {}) => {
        successLogger.info(`Success request at ${Date.now()}, details message: ${message} data: ${JSON.stringify(data)}`);
        return res.json({ status: true, message: message, data });
    },

    errorhandler: (req, res, message = SERVER_ERROR_MESSAGE, data = {}) => {
        errorLogger.error(`Error at ${Date.now()} processing request: ${`${req.protocol}://${req.get('host')}${req.originalUrl}`} details message: ${message} data: ${JSON.stringify(data)}`);
        return res.json({ status: false, message: message, data });
    }
};

module.exports = requestHandler;
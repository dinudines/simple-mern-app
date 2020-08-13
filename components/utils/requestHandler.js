const { SERVER_ERROR_MESSAGE } = require('../../constants');

const requestHandler = {

    sendSuccess: (res, type, message = 'Success', data = {}) => {
        //this.logger.log(`a request has been made and processed successfully at: ${new Date()}`, 'info');
        return res.json({ status: true, type: type, message: message, data });
    },

    sendError: (res, error, data = {}) => {
        //this.logger.log(`error ,Error during processing request: ${`${req.protocol}://${req.get('host')}${req.originalUrl}`} details message: ${error.message}`, 'error');
        return res.json({ status: false, type: 'error', message: error.message || SERVER_ERROR_MESSAGE, data });
    }
};

module.exports = requestHandler;
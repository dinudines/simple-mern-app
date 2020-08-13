const { SERVER_ERROR_MESSAGE } = require('../../constants');

const requestHandler = {

    successHandler: (res, message = 'Success', data = {}) => {
        //this.logger.log(`a request has been made and processed successfully at: ${new Date()}`, 'info');
        return res.json({ status: true, message: message, data });
    },

    errorhandler: (res, message = SERVER_ERROR_MESSAGE, data = {}) => {
        //this.logger.log(`error ,Error during processing request: ${`${req.protocol}://${req.get('host')}${req.originalUrl}`} details message: ${error.message}`, 'error');
        return res.json({ status: false, message: message, data });
    }
};

module.exports = requestHandler;
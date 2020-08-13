const winston = require('winston');
require('winston-mongodb');

const successLogger = winston.createLogger({
    transports: [
        new winston.transports.MongoDB({
            db: process.env.DB_CONNECTION,
            collection: 'logs',
            level: 'info',
            storeHost: true,
            capped: true,
        })
    ]
});

const errorLogger = winston.createLogger({
    transports: [
        new winston.transports.MongoDB({
            db: process.env.DB_CONNECTION,
            collection: 'logs',
            level: 'error',
            storeHost: true,
            capped: true,
        })
    ]
});

module.exports = {
    successLogger,
    errorLogger
}

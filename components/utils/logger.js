const winston = require('winston');
require('winston-mongodb');

const DB_URL = process.env.NODE_ENV === 'test'
    ? process.env.DB_TEST_CONNECTION
    : process.env.DB_CONNECTION;

const successLogger = winston.createLogger({
    transports: [
        new winston.transports.MongoDB({
            db: DB_URL,
            collection: 'logs',
            level: 'info',
            storeHost: true,
            capped: true,
            silent: true,
        })
    ]
});

const errorLogger = winston.createLogger({
    transports: [
        new winston.transports.MongoDB({
            db: DB_URL,
            collection: 'logs',
            level: 'error',
            storeHost: true,
            capped: true,
            silent: true,
        })
    ]
});

module.exports = {
    successLogger,
    errorLogger
}

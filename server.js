const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const routes = require('./routes/api');
require('dotenv').config();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(morgan('combined', { stream: accessLogStream }));

mongoose
    .connect(process.env.DB_CONNECTION, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((e) => {
        console.log('Connection failed');
    });

app.use('/api', routes);

// If changing port other than 8000 then change proxy at the client's package.json
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log('Server is listening on the port :', PORT);
});

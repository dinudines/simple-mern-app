const express = require('express');
const router = express.Router();
const usersAPI = require('../../components/user/usersAPI');

router.use('/users', usersAPI);

module.exports = router;
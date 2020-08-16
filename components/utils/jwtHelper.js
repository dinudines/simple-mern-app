const jwt = require('jsonwebtoken');

const getToken = (data) => {
    return jwt.sign({ user: data }, process.env.SECRET_KEY, { expiresIn: '2h' });
};

const verifyToken = (req) => {
    if(
        !req.headers.hasOwnProperty('authorization')
        || req.headers.authorization.length < 7
        || req.headers.authorization.indexOf('Bearer ') == -1
        || req.headers.authorization.split(' ').length < 2
    ){
        return false;
    }

    const auth = req.headers.authorization;
    const token = auth.split(' ')[1];

    var decodedTokenData = jwt.verify(token,  process.env.SECRET_KEY);
    return decodedTokenData;
}

module.exports = {
    getToken,
    verifyToken
};
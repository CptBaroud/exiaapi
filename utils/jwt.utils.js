let jwt = require('jsonwebtoken');
let user = require('../models/login');

const JWT_SECRET_SIGN = process.env.JWT_SECRET_SIGN;

module.exports = {
    generatedToken: function (username) {
        return jwt.sign({
            user: username,
        }, JWT_SECRET_SIGN)
    },

    generateOneTImeToken: function () {
        return jwt.sign({
            type: 0
        }, JWT_SECRET_SIGN)
    },

    getTokenInfo: function (token) {
        return jwt.decode(token)
    }
};

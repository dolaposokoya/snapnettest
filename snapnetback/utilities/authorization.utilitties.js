const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const jwtAlgorithm = "HS256";
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;


module.exports = {
    async checkToken(token) {
        try {
            if (token === '' || token === undefined || token === null) {
                return {
                    success: false
                }
            } else {
                return {
                    user_token: jwt.verify(token, JWT_SECRET_KEY),
                    success: true
                };
            }
        } catch (err) {
            return false;
        }
    },
    async generateToken(email, _id, user_type) {
        try {
            const token = jwt.sign({ email: email, userType: user_type, _id: _id }, JWT_SECRET_KEY, { algorithm: jwtAlgorithm, expiresIn: jwtExpiresIn, subject: _id.toString() })
            if (token) {
                return token
            } else {
                return false
            }
        } catch (err) {
            return false;
        }
    },
}
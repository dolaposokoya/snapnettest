const { SESSION_ID } = process.env
const { checkToken } = require('../utilities/authorization.utilitties');
const User = require("../models/user.model");

const verifyToken = async (req, res, next) => {
    try {
        if (req.headers && req.headers?.authorization) {
            const userToken = req.headers.authorization.split(' ')[1];
            if (userToken) {
                const legit = await checkToken(userToken)
                if (legit.success === true) {
                    req.user = legit.user_token
                    const response = await User.findById({ _id: req.user._id })
                    if (response) {
                        next();
                    }
                    else {
                        res.status(403).json({ message: 'Forbidden', success: false })
                    }
                }
                else {
                    res.status(401).json({ message: 'Unauthorized Access', success: false })
                }
            }
            else {
                res.status(401).json({ message: 'Access Denied', success: false })
            }
        }
        else{
            res.status(200).json({ message: 'Missing authorization', success: false })
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}


module.exports = {
    verifyToken
}
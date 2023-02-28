"use strict";
const { encryptPassword, verifyPassword } = require('../utilities/password.utilities');
const { generateToken } = require('../utilities/authorization.utilitties')
const userSchema = require("../models/user.model");
const statusMessages = require('../constants/messages.constants')


const findUser = async (req, res, next) => {
    try {
        if (req.body && req.body?.email !== '') {
            const email = req.body.email.toLowerCase()
            const response = await userSchema.findOne({ email: email });
            if (response && response.email === email) {
                res.json(statusMessages.ERROR_MSG.EMAIL_EXIST)
            } else {
                next();
            }
        }
        else {
            statusMessages.ERROR_MSG.INVALID_INPUT.message = 'Check your input field'
            res.json(statusMessages.ERROR_MSG.INVALID_INPUT)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

const requestAccessToken = async (req, res) => {
    try {
        const { name, email } = req.body
        if (name !== '' && email !== '') {
            const user = new userSchema(req.body);
            user.name = user.name.toLowerCase()
            user.name = user.name.charAt(0).toUpperCase() + user.name.slice(1)
            const hash = await encryptPassword(user.password);
            if (hash) {
                user.password = hash
                user.email = user.email.toLowerCase()
                const response = await user.save();
                if (response) {
                    const token = await generateToken(user.email, user._id, user.user_type)
                    statusMessages.SUCCESS_MSG.SUCCESS.data = token
                    res.json(statusMessages.SUCCESS_MSG.SUCCESS)
                } else {
                    res.json(statusMessages.ERROR_MSG.UNABLE_TO_REGISTER)
                }
            } else {
                res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
            }
        }
        else {
            statusMessages.ERROR_MSG.INVALID_INPUT.message = 'Check your input field'
            res.json(statusMessages.ERROR_MSG.INVALID_INPUT)
        }
    } catch (error) {
        console.log('error',error)
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (name !== '' && email !== '' && password !== '') {
            const user = new userSchema(req.body);
            user.name = user.name.toLowerCase()
            user.name = user.name.charAt(0).toUpperCase() + user.name.slice(1)
            const hash = await encryptPassword(user.password);
            if (hash) {
                user.password = hash
                user.email = user.email.toLowerCase()
                const response = await user.save();
                if (response) {
                    statusMessages.SUCCESS_MSG.SUCCESS.data = response
                    res.json(statusMessages.SUCCESS_MSG.SUCCESS)
                } else {
                    res.json(statusMessages.ERROR_MSG.UNABLE_TO_REGISTER)
                }
            } else {
                res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
            }
        }
        else {
            statusMessages.ERROR_MSG.INVALID_INPUT.message = 'Check your input field'
            res.json(statusMessages.ERROR_MSG.INVALID_INPUT)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { password } = req.body;
        const email = req.body.email.toLowerCase();
        const response = await userSchema.findOne({ email: email.toLowerCase() })
        if (!response) {
            res.json(statusMessages.ERROR_MSG.DATA_NOT_FOUND)
        } else {
            if (response) {
                const userEmail = response.email.toLowerCase()
                if (email != userEmail) {
                    res.json(statusMessages.ERROR_MSG.EMAIL_NOT_FOUND)
                }
                else if (email === userEmail) {
                    const hashedPassword = response.password
                    const decrypt = await verifyPassword(password, hashedPassword)
                    if (decrypt) {
                        const { _id, email, user_type, name } = response
                        const token = await generateToken(email, _id, user_type)
                        if (token) {
                            req.token = token
                            req._id = _id
                            req.user = {
                                _id: _id,
                                email: email,
                                user_type: user_type
                            }
                            statusMessages.SUCCESS_MSG.SUCCESS.data = { name, email, token }
                            res.json(statusMessages.SUCCESS_MSG.SUCCESS)
                        }
                        else {
                            res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
                        }
                    } else {
                        res.json(statusMessages.ERROR_MSG.EMAIL_OR_PASSWORD)
                    }
                }
            } else {
                res.json(statusMessages.ERROR_MSG.DATA_NOT_FOUND)
            }
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

const getOneUser = async (req, res) => {
    try {
        const { id } = req.params
        if (id !== '') {
            const response = await userSchema.findById({ _id: id })
            if (response) {
                statusMessages.SUCCESS_MSG.SUCCESS.data = response
                res.json(statusMessages.SUCCESS_MSG.SUCCESS)
            } else {
                res.json(statusMessages.ERROR_MSG.DATA_NOT_FOUND)
            }
        }
        else {
            statusMessages.ERROR_MSG.INVALID_INPUT.message = 'Check your input field'
            res.status(204).json(statusMessages.ERROR_MSG.INVALID_INPUT)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await userSchema.find().sort({ createdAt: -1 })
        if (response) {
            statusMessages.SUCCESS_MSG.SUCCESS.data = response
            res.json(statusMessages.SUCCESS_MSG.SUCCESS)
        } else {
            res.json(statusMessages.ERROR_MSG.DATA_NOT_FOUND)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

// 1 is ascending  while -1 is descending
const sortAllUser = async (req, res) => {
    try {
        const { fieldName, orderBy } = req.query
        if (fieldName === 'first_name') {
            abc({ first_name: parseInt(orderBy) })
        }
        else if (fieldName === 'gender') {
            abc({ gender: parseInt(orderBy) })
        }
        else if (fieldName === 'blood_group') {
            abc({ blood_group: parseInt(orderBy) })
        }
        else if (fieldName === 'city') {
            abc({ city: parseInt(orderBy) })
        }
        async function abc(data) {
            const response = await userSchema.find().sort(data)
            if (response) {
                statusMessages.SUCCESS_MSG.SUCCESS.data = response
                res.json(statusMessages.SUCCESS_MSG.SUCCESS)
            } else {
                res.json(statusMessages.ERROR_MSG.DATA_NOT_FOUND)
            }
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

// Previous filter user
const filterUser = async (req, res) => {
    try {
        const { search } = req.query
        if (search) {
            const query = {
                $or: [{ first_name: { $regex: new RegExp(`${search}`, 'gi', '+') } }, { gender: { $regex: new RegExp(`^${search}`, 'gi', '+') } }, { blood_group: { $regex: new RegExp(`^${search}`, 'gi', '+') } }, { city: { $regex: new RegExp(`^${search}`, 'gi', '+') } }]
            }
            filterusers(query)
        } else {
            const query = {}
            filterusers(query)
        }
        async function filterusers(filter) {
            const response = await userSchema.paginate(filter)
            if (response) {
                statusMessages.SUCCESS_MSG.SUCCESS.data = response
                res.json(statusMessages.SUCCESS_MSG.SUCCESS)
            } else {
                res.json(statusMessages.ERROR_MSG.DATA_NOT_FOUND)
            }
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}


const updateUser = async (req, res) => {
    try {
        const { password } = req.body;
        // const { id } = req.query;
        const { _id } = req.user
        const hash = await encryptPassword(password);
        if (hash) {
            const response = await userSchema.findByIdAndUpdate({ _id: _id }, req.body, { returnOriginal: false })
            if (response) {
                statusMessages.SUCCESS_MSG.SUCCESS.data = response
                res.json(statusMessages.SUCCESS_MSG.SUCCESS)
            } else {
                res.json(statusMessages.ERROR_MSG.UNABLE_TO_UPDATE)
            }
        } else {
            res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}


const forgotPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newEmail = email.toLowerCase()
        const hash = await encryptPassword(password)
        if (hash) {
            const response = await userSchema.findOneAndUpdate({ email: newEmail }, { password: hash })
            if (response) {
                statusMessages.SUCCESS_MSG.SUCCESS.data = response
                res.json(statusMessages.SUCCESS_MSG.SUCCESS)
            } else {
                res.json(statusMessages.ERROR_MSG.UNABLE_TO_UPDATE)
            }
        } else {
            res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}


const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.query
        const response = await userSchema.findByIdAndDelete({ _id: id })
        if (response) {
            req.file = response.profile_image.fileName
            next();
        } else {
            res.json(statusMessages.ERROR_MSG.DATA_NOT_FOUND)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}


module.exports = {
    findUser,
    registerUser,
    requestAccessToken,
    loginUser,
    getOneUser,
    getAllUser,
    filterUser,
    sortAllUser,
    updateUser,
    forgotPassword,
    deleteUser,
}
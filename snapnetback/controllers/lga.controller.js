"use strict";
const lgaSchema = require("../models/lga.model");
const StateSchema = require("../models/state.model");
const statusMessages = require('../constants/messages.constants')


const checkLga = async (req, res, next) => {
    try {
        let { name } = req.body
        if (name !== '') {
            name = name.toLowerCase()
            name = name.charAt(0).toUpperCase() + name.slice(1)
            const response = await lgaSchema.findOne({ name: name })
            if (response) {
                res.json(statusMessages.ERROR_MSG.DATA_EXIST)
            } else {
                next()
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

const createLga = async (req, res) => {
    try {
        const { name, state } = req.body
        if (name !== '') {
            const lga = new lgaSchema(req.body);
            lga.name = lga.name.toLowerCase()
            lga.name = lga.name.charAt(0).toUpperCase() + lga.name.slice(1)
            const response = await lga.save();
            if (response) {
                const lgaState = await StateSchema.findById({ _id: state });
                if (lgaState && lgaState._id) {
                    lgaState.lga.push(response._id)
                    const updatedState = await lgaState.save()
                    if (updatedState && updatedState._id) {
                        statusMessages.SUCCESS_MSG.SUCCESS.data = response
                        res.json(statusMessages.SUCCESS_MSG.SUCCESS)
                    }
                    else {
                        res.json(statusMessages.ERROR_MSG.UNABLE_TO_MAKE_REQUEST)
                    }
                }
                else {
                    res.json(statusMessages.ERROR_MSG.INVALID_INPUT)
                }
            } else {
                res.json(statusMessages.ERROR_MSG.UNABLE_TO_REGISTER)
            }
        }
        else {
            statusMessages.ERROR_MSG.INVALID_INPUT.message = 'Check your input field'
            res.json(statusMessages.ERROR_MSG.INVALID_INPUT)
        }
    } catch (error) {
        console.log('error', error)
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

const getLga = async (req, res) => {
    try {
        const { id } = req.params
        if (id !== '') {
            const response = await lgaSchema.findById({ _id: id })
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

const getLgas = async (req, res) => {
    try {
        const response = await lgaSchema.find().populate('wards')
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

const updateLga = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await lgaSchema.findByIdAndUpdate({ _id: id }, req.body, { returnOriginal: false })
        if (response) {
            statusMessages.SUCCESS_MSG.SUCCESS.data = response
            res.json(statusMessages.SUCCESS_MSG.SUCCESS)
        } else {
            res.json(statusMessages.ERROR_MSG.UNABLE_TO_UPDATE)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}


module.exports = {
    checkLga,
    createLga,
    getLga,
    getLgas,
    updateLga,
}
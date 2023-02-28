"use strict";
const lgaSchema = require("../models/lga.model");
const statusMessages = require('../constants/messages.constants')



const createLga = async (req, res) => {
    try {
        const { name } = req.body
        if (name !== '') {
            const state = new lgaSchema(req.body);
            state.name = state.name.toLowerCase()
            state.name = state.name.charAt(0).toUpperCase() + state.name.slice(1)
            const response = await state.save();
            if (response) {
                statusMessages.SUCCESS_MSG.SUCCESS.data = response
                res.json(statusMessages.SUCCESS_MSG.SUCCESS)
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
        const response = await lgaSchema.find().populate('state')
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
    createLga,
    getLga,
    getLgas,
    updateLga,
}
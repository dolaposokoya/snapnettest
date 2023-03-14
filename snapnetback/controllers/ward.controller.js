"use strict";
const wardSchema = require("../models/ward.model");
const statusMessages = require('../constants/messages.constants')
const lgaSchema = require("../models/lga.model");


const checkWard = async (req, res, next) => {
    try {
        let { name } = req.body
        if (name !== '') {
            name = name.toLowerCase()
            name = name.charAt(0).toUpperCase() + name.slice(1)
            const response = await wardSchema.findOne({ name: name })
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

const createWard = async (req, res) => {
    try {
        const { name, lga } = req.body
        if (name !== '') {
            const state = new wardSchema(req.body);
            state.name = state.name.toLowerCase()
            state.name = state.name.charAt(0).toUpperCase() + state.name.slice(1)
            const response = await state.save();
            if (response) {
                const lgaState = await lgaSchema.findById({ _id: lga });
                if (lgaState && lgaState._id) {
                    lgaState.wards.push(response._id)
                    const updatedState = await lgaState.save()
                    if (updatedState && updatedState._id) {
                        statusMessages.SUCCESS_MSG.SUCCESS.data = response
                        res.json(statusMessages.SUCCESS_MSG.SUCCESS)
                    }
                    else {
                        res.json(statusMessages.ERROR_MSG.UNABLE_TO_MAKE_REQUEST)
                    }
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
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

const getWard = async (req, res) => {
    try {
        const { id } = req.params
        if (id !== '') {
            const response = await wardSchema.findById({ _id: id })
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

const getWards = async (req, res) => {
    try {
        const response = await wardSchema.find().sort({ name: 1 })
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

const updateWard = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await wardSchema.findByIdAndUpdate({ _id: id }, req.body, { returnOriginal: false })
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
    checkWard,
    createWard,
    getWard,
    getWards,
    updateWard,
}
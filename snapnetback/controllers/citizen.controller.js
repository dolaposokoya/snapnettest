"use strict";
const citizenSchema = require("../models/citizen.model");
const statusMessages = require('../constants/messages.constants')



const createCitizen = async (req, res) => {
    try {
        const { full_name, gender, address, phone, ward_id } = req.body
        if (full_name !== '' && gender !== '' && address !== '' && phone !== '' && ward_id !== '') {
            const citizen = new citizenSchema(req.body);
            citizen.full_name = citizen.full_name.toLowerCase()
            citizen.full_name = citizen.full_name.charAt(0).toUpperCase() + citizen.full_name.slice(1)
            const response = await citizen.save();
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
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

const getCitizen = async (req, res) => {
    try {
        const { id } = req.params
        if (id !== '') {
            const response = await citizenSchema.findById({ _id: id }).populate(['ward'])
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

const getCitizens = async (req, res) => {
    try {
        const response = await citizenSchema.find().populate(['ward']).sort({ createdAt: -1 })
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

const updateCitizen = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await citizenSchema.findByIdAndUpdate({ _id: id }, req.body, { returnOriginal: false })
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


const deleteCitizen = async (req, res, next) => {
    try {
        const { id } = req.params
        const response = await citizenSchema.findByIdAndDelete({ _id: id })
        if (response) {
            statusMessages.SUCCESS_MSG.SUCCESS.data = response
            statusMessages.SUCCESS_MSG.SUCCESS.message = 'Citizen deleted'
            res.json(statusMessages.SUCCESS_MSG.SUCCESS)
        } else {
            res.json(statusMessages.ERROR_MSG.DATA_NOT_FOUND)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}


module.exports = {
    createCitizen,
    getCitizen,
    getCitizens,
    updateCitizen,
    deleteCitizen,
}
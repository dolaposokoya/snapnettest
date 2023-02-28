const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citizenSchema = new Schema({
    full_name: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
        length: 11,
    },
    ward: { type: mongoose.Schema.Types.ObjectId, ref: "ward" },
},
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = mongoose.model("citizen", citizenSchema);


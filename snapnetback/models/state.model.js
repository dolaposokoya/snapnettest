const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    name: {
        type: String,
        required: false,
        unique: true,
    },
},
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = mongoose.model("state", stateSchema);


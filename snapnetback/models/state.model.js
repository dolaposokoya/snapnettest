const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    name: {
        type: String,
        required: false,
        unique: true,
    },
    lga: [{ type: mongoose.Schema.Types.ObjectId, ref: "lga" }],
},
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = mongoose.model("state", stateSchema);


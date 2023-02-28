const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
    },
    user_type: {
        type: String,
        default: 'user'
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        default: '12345678'
    },
},
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = mongoose.model("user", userSchema);
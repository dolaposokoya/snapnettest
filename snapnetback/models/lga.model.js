const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lgaSchema = new Schema({
  name: {
    type: String,
    required: false,
    unique: false,
  },
  state: { type: mongoose.Schema.Types.ObjectId, ref: "state" },
},
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("lga", lgaSchema);


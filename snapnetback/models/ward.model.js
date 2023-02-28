const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wardSchema = new Schema({
  name: {
    type: String,
  },
  lga: { type: mongoose.Schema.Types.ObjectId, ref: "lga" },
},
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("ward", wardSchema);


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lgaSchema = new Schema({
  name: {
    type: String,
    required: false,
    unique: false,
  },
  wards: [{ type: mongoose.Schema.Types.ObjectId, ref: "ward" }],
},
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("lga", lgaSchema);


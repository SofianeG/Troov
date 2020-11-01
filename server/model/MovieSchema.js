const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const bcrypt = require("bcrypt");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    moviePicture: { type: String },
    year: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", MovieSchema);

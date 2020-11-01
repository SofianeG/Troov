const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    picture: { type: String },
    female: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);

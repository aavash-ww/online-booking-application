const mongoose = require("mongoose");

const placeSchema = mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  photo: [String],
  description: String,
  perks: String,
  extraInfo: String,
  checkIn: Number,
  checkOuts: Number,
  maxGuests: Number,
});

module.exports = mongoose.model("Places", placeSchema);

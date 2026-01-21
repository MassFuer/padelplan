const e = require("express");
const {Schema, model} = require("mongoose");

const padelCourtsSchema = new Schema({
  title: { type: String, required: true },
  surface: { type: String, enum: ["clay", "grass", "hard", "artificial turf"], default: "hard" },
  type: { type: String, enum: ["indoor", "outdoor"] },
  isLighted: { type: Boolean, default: false },
  courtNumber: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  price_per_15min: { type: Number, required: true },
  club: { type: Schema.Types.ObjectId, ref: "PadelClub", required: true },
});

module.exports = model("PadelCourt", padelCourtsSchema);
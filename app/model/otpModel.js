const mongoose = require("mongoose");

// Defining Schema
const OtpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "15m" },
});

// Model
const otpModel = mongoose.model(
  "Otp",
  OtpSchema
);

module.exports = otpModel;

// backend/models/Verification.js
const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
  donorId: { type: String, required: true },
  name: { type: String, required: true },
  method: { type: String, required: true },
  details: { type: Object, required: true },
  status: { type: String, enum: ["pending", "verified"], default: "pending" },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Verification", verificationSchema);
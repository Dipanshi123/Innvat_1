const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  category: { type: String, required: true },
  diet: { type: String, enum: ["veg", "nonveg"], required: true },
  quantityAmount: { type: Number, required: true },
  quantityUnit: { type: String, default: "portions" },
  servings: { type: Number, required: true },
  condition: { type: String, required: true },
  storage: { type: String, required: true },
  preparedAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true },
  deadline: { type: Date, required: true },
  location: { type: String, required: true },
  donor: { type: String, required: true },
  donorId: { type: String, required: true },
  notes: { type: String, default: "" },
  image: { type: String, default: "" },
  status: { type: String, enum: ["Available", "Reserved", "Picked Up"], default: "Available" },
  reservedBy: { type: String, default: "" },
  reservedOrg: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Listing", listingSchema);
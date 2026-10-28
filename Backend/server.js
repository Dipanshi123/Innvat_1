const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// In-Memory Database Arrays
let listings = [];
let verifications = [];

// 1. Get listings
app.get("/api/listings", (req, res) => {
  res.json(listings);
});

// 2. Create listing
app.post("/api/listings", (req, res) => {
  const item = { id: "fr-" + Date.now(), ...req.body, createdAt: new Date() };
  listings.unshift(item);
  res.status(201).json(item);
});

// 3. Reserve listing
app.patch("/api/listings/:id/reserve", (req, res) => {
  const { reservedBy, reservedOrg } = req.body;
  const item = listings.find((l) => l.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Listing not found" });

  item.status = "Reserved";
  item.reservedBy = reservedBy;
  item.reservedOrg = reservedOrg;
  res.json(item);
});

// 4. Pickup listing
app.patch("/api/listings/:id/pickup", (req, res) => {
  const item = listings.find((l) => l.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Listing not found" });

  item.status = "Picked Up";
  res.json(item);
});

// 5. Verify API
app.post("/api/verify", (req, res) => {
  verifications.push({ ...req.body, submittedAt: new Date() });
  res.json({ status: "pending", message: "Saved for review" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:5000`);
});
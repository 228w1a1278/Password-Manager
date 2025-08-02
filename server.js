const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyparser = require("body-parser");

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

// MongoDB setup
const client = new MongoClient(process.env.MONGODB_URI);
const dbName = "Passop";

// Middleware
app.use(cors());
app.use(bodyparser.json());

// React build path
app.use(express.static(path.join(__dirname, "dist"))); // or "build" if you're using CRA

// API routes
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

app.post("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const result = await collection.insertOne(password);
  res.send({ success: true, result });
});

app.delete("/", async (req, res) => {
  const { id } = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const result = await collection.deleteOne({ id });
  res.send({ success: result.deletedCount > 0 });
});

// Catch-all to serve React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html")); // or "build"
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

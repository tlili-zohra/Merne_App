const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const itemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Item", itemSchema);

app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Serve React static files and handle React routing in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("/^/(?!api).*/", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const subscriptionRoutes = require(
  "./routes/subscriptionRoutes"
);
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);

app.use(
  "/api/subscriptions",
  subscriptionRoutes
);

app.use("/api/ai", aiRoutes);

// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running...");
});

// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
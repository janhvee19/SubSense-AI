const express = require("express");

const {
  generateInsights,
} = require("../controllers/aiController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/insights",
  protect,
  generateInsights
);

module.exports = router;
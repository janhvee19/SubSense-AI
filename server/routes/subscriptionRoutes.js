const express = require("express");

const {
  addSubscription,
  getSubscriptions,
  deleteSubscription,
  updateSubscription,
} = require("../controllers/subscriptionController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addSubscription);

router.get("/", protect, getSubscriptions);

router.delete("/:id",protect,deleteSubscription);

router.put(
  "/:id",
  protect,
  updateSubscription
);

module.exports = router;
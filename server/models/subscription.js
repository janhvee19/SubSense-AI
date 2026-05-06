const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    platform: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    billingCycle: {
      type: String,
      required: true,
    },

    renewalDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Subscription",
  subscriptionSchema
);
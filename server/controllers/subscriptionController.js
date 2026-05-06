const Subscription = require("../models/Subscription");


// ADD SUBSCRIPTION
const addSubscription = async (req, res) => {
  try {
    const {
      platform,
      amount,
      billingCycle,
      renewalDate,
    } = req.body;

    const subscription =
      await Subscription.create({
        userId: req.user.id,
        platform,
        amount,
        billingCycle,
        renewalDate,
      });

    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET USER SUBSCRIPTIONS
const getSubscriptions = async (
  req,
  res
) => {
  try {
    const subscriptions =
      await Subscription.find({
        userId: req.user.id,
      });

    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// DELETE SUBSCRIPTION
const deleteSubscription = async (
  req,
  res
) => {
  try {
    const subscription =
      await Subscription.findById(
        req.params.id
      );

    if (!subscription) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }

    await subscription.deleteOne();

    res.status(200).json({
      message: "Subscription deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE SUBSCRIPTION
const updateSubscription = async (
  req,
  res
) => {
  try {
    const subscription =
      await Subscription.findById(
        req.params.id
      );

    if (!subscription) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }

    subscription.platform =
      req.body.platform ||
      subscription.platform;

    subscription.amount =
      req.body.amount ||
      subscription.amount;

    subscription.billingCycle =
      req.body.billingCycle ||
      subscription.billingCycle;

    subscription.renewalDate =
      req.body.renewalDate ||
      subscription.renewalDate;

    const updatedSubscription =
      await subscription.save();

    res.status(200).json(
      updatedSubscription
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addSubscription,
  getSubscriptions,
  deleteSubscription,
  updateSubscription,
};
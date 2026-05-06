const generateInsights = async (
  req,
  res
) => {
  try {
    const subscriptions = req.body;

    // TOTAL SPENDING
    const total = subscriptions.reduce(
      (acc, sub) =>
        acc + Number(sub.amount),
      0
    );

    // HIGHEST EXPENSE
    const highest = subscriptions.reduce(
      (max, sub) =>
        sub.amount > (max?.amount || 0)
          ? sub
          : max,
      null
    );

    // MONTHLY/YEARLY COUNTS
    const monthlyCount =
      subscriptions.filter(
        (sub) =>
          sub.billingCycle
            .toLowerCase()
            .includes("month")
      ).length;

    const yearlyCount =
      subscriptions.filter(
        (sub) =>
          sub.billingCycle
            .toLowerCase()
            .includes("year")
      ).length;

    // AI-LIKE INSIGHTS
    let insights = `
💰 Total Spending: ₹${total}

🔥 Highest Expense:
${highest?.platform} - ₹${highest?.amount}

📊 Subscription Breakdown:
Monthly Plans: ${monthlyCount}
Yearly Plans: ${yearlyCount}

💡 Recommendation:
Switch long-term subscriptions to yearly billing for better savings.

⚠️ Smart Suggestion:
Review inactive subscriptions regularly to reduce unnecessary expenses.
`;

    // HIGH SPENDING WARNING
    if (total > 3000) {
      insights += `

🚨 Spending Alert:
Your subscription spending is quite high this month.
`;
    }

    res.status(200).json({
      insights,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "AI Error",
    });
  }
};

module.exports = {
  generateInsights,
};
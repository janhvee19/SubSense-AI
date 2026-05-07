"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../lib/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import Tesseract from "tesseract.js";

type Subscription = {
  _id: string;
  platform: string;
  amount: number | string;
  billingCycle: string;
  renewalDate: string;
};

type SubscriptionForm = {
  platform: string;
  amount: string;
  billingCycle: string;
  renewalDate: string;
};

export default function DashboardPage() {
  const router = useRouter();

  // STATES
  const [subscriptions, setSubscriptions] =
    useState<Subscription[]>([]);

  const [aiInsights, setAiInsights] =
    useState("");

  const [chartsReady, setChartsReady] =
    useState(false);

  const [formData, setFormData] =
    useState<SubscriptionForm>({
      platform: "",
      amount: "",
      billingCycle: "",
      renewalDate: "",
    });

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [editData, setEditData] =
    useState<SubscriptionForm>({
      platform: "",
      amount: "",
      billingCycle: "",
      renewalDate: "",
    });

  // AI INSIGHTS
  const fetchAIInsights = useCallback(async (
    token: string,
    subscriptionsData: Subscription[]
  ) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/ai/insights`,
        subscriptionsData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAiInsights(
        res.data.insights
      );
    } catch (error) {
      console.log(error);

      setAiInsights(
        "AI insights unavailable."
      );
    }
  }, []);

  // FETCH SUBSCRIPTIONS
  const fetchSubscriptions = useCallback(async (
    token: string
  ) => {
    try {
      const res = await axios.get<Subscription[]>(
        `${API_BASE_URL}/api/subscriptions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSubscriptions(res.data);

      fetchAIInsights(
        token,
        res.data
      );
    } catch (error) {
      console.log(error);
    }
  }, [fetchAIInsights]);

  // LOAD DATA
  useEffect(() => {
    const token = localStorage.getItem(
      "token"
    );

    if (!token) {
      router.push("/login");
      return;
    }

    void Promise.resolve().then(() =>
      fetchSubscriptions(token)
    );
  }, [fetchSubscriptions, router]);

  useEffect(() => {
    void Promise.resolve().then(() =>
      setChartsReady(true)
    );
  }, []);

  // FORM CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ADD SUBSCRIPTION
  const addSubscription = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem(
        "token"
      );

      await axios.post(
        `${API_BASE_URL}/api/subscriptions`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Subscription Added"
      );

      fetchSubscriptions(token!);

      setFormData({
        platform: "",
        amount: "",
        billingCycle: "",
        renewalDate: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const deleteSubscription =
    async (id: string) => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await axios.delete(
          `${API_BASE_URL}/api/subscriptions/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        fetchSubscriptions(token!);
      } catch (error) {
        console.log(error);
      }
    };

  // START EDIT
  const startEditing = (
    sub: Subscription
  ) => {
    setEditingId(sub._id);

    setEditData({
      platform: sub.platform,
      amount: String(sub.amount),
      billingCycle:
        sub.billingCycle,
      renewalDate:
        sub.renewalDate.split(
          "T"
        )[0],
    });
  };

  // HANDLE EDIT CHANGE
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditData({
      ...editData,
      [e.target.name]:
        e.target.value,
    });
  };

  // SAVE EDIT
  const saveEdit = async () => {
    try {
      const token = localStorage.getItem(
        "token"
      );

      await axios.put(
        `${API_BASE_URL}/api/subscriptions/${editingId}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditingId(null);

      fetchSubscriptions(token!);
    } catch (error) {
      console.log(error);
    }
  };

  // OCR SCANNER
  const scanInvoice = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    try {
      alert(
        "Scanning invoice..."
      );

      const {
        data: { text },
      } =
        await Tesseract.recognize(
          file,
          "eng"
        );

      console.log(
        "OCR TEXT:",
        text
      );

      // LOWERCASE TEXT
      const lowerText =
        text.toLowerCase();

      // DETECT PLATFORM
      let detectedPlatform =
        "";

      const platforms = [
        "netflix",
        "spotify",
        "amazon prime",
        "prime",
        "youtube",
        "chatgpt",
        "disney",
        "hotstar",
      ];

      for (const platform of platforms) {
        if (
          lowerText.includes(
            platform
          )
        ) {
          detectedPlatform =
            platform;
          break;
        }
      }

      // FORMAT PLATFORM
      if (
        detectedPlatform ===
        "prime"
      ) {
        detectedPlatform =
          "Prime Video";
      }

      if (
        detectedPlatform ===
        "youtube"
      ) {
        detectedPlatform =
          "YouTube Premium";
      }

      if (
        detectedPlatform ===
        "chatgpt"
      ) {
        detectedPlatform =
          "ChatGPT Plus";
      }

      // AMOUNT DETECTION
      let detectedAmount = "";

      const cleanedText =
        text
          .replace(/,/g, "")
          .replace(/\s/g, "");

      console.log(
        "CLEANED TEXT:",
        cleanedText
      );

      const amountMatch =
        cleanedText.match(
          /₹?(\d+(\.\d{1,2})?)/
        );

      if (amountMatch) {
        let rawAmount =
          amountMatch[1];

        console.log(
          "RAW AMOUNT:",
          rawAmount
        );

        // FIX EXTRA DIGIT ISSUE
        if (
          rawAmount.startsWith(
            "2"
          ) &&
          rawAmount.length >
            5
        ) {
          rawAmount =
            rawAmount.substring(
              1
            );
        }

        detectedAmount =
          parseFloat(
            rawAmount
          ).toString();
      }

      console.log(
        "FINAL AMOUNT:",
        detectedAmount
      );

      // AUTO FILL FORM
      setFormData({
        platform:
          detectedPlatform ||
          "",
        amount:
          detectedAmount,
        billingCycle:
          "Monthly",
        renewalDate: "",
      });

      alert(
        "Invoice scanned successfully!"
      );
    } catch (error) {
      console.log(error);

      alert("OCR Failed");
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    router.push("/login");
  };

  // ANALYTICS
  const totalSpent =
    subscriptions.reduce(
      (acc, sub) =>
        acc +
        Number(sub.amount),
      0
    );

  const highestSubscription =
    subscriptions.reduce<Subscription | null>(
      (max, sub) =>
        Number(sub.amount) >
        Number(max?.amount || 0)
          ? sub
          : max,
      null
    );

  // CHART DATA
  const pieData =
    subscriptions.map(
      (sub) => ({
        name: sub.platform,
        value: Number(sub.amount),
      })
    );

  const barData =
    subscriptions.map(
      (sub) => ({
        name: sub.platform,
        amount: Number(sub.amount),
      })
    );

  const COLORS = [
    "#3B82F6",
    "#8B5CF6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#EC4899",
  ];

  return (
    <div className="min-h-screen bg-black text-white p-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-bold">
          SubSense AI 🚀
        </h1>

        <button
          onClick={logout}
          className="bg-white text-black px-5 py-2 rounded-lg font-semibold"
        >
          Logout
        </button>
      </div>

      {/* ANALYTICS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-zinc-400 mb-2">
            Total Spending
          </h2>

          <p className="text-4xl font-bold">
            ₹ {totalSpent}
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-zinc-400 mb-2">
            Active
            Subscriptions
          </h2>

          <p className="text-4xl font-bold">
            {
              subscriptions.length
            }
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-zinc-400 mb-2">
            Highest Expense
          </h2>

          <p className="text-3xl font-bold">
            {highestSubscription
              ? `${highestSubscription.platform} - ₹${highestSubscription.amount}`
              : "N/A"}
          </p>
        </div>
      </div>

      {/* AI INSIGHTS */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl mb-10">
        <h2 className="text-3xl font-bold mb-4">
          AI Insights 🤖
        </h2>

        <p className="text-lg whitespace-pre-line">
          {aiInsights ||
            "Generating AI insights..."}
        </p>
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* PIE */}
        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6">
            Spending
            Breakdown
          </h2>

          <div className="h-[300px]">
            {chartsReady && (
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={
                      100
                    }
                    label
                  >
                    {pieData.map(
                      (
                        _,
                        index
                      ) => (
                        <Cell
                          key={
                            index
                          }
                          fill={
                            COLORS[
                              index %
                                COLORS.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* BAR */}
        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6">
            Subscription
            Costs
          </h2>

          <div className="h-[300px]">
            {chartsReady && (
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart
                  data={
                    barData
                  }
                >
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="amount"
                    fill="#3B82F6"
                    radius={[
                      8,
                      8,
                      0,
                      0,
                    ]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* OCR */}
      <div className="bg-zinc-900 p-6 rounded-xl mb-10">
        <h2 className="text-2xl font-bold mb-4">
          OCR Invoice Scanner 📄
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={
            scanInvoice
          }
          className="bg-zinc-800 p-3 rounded-lg"
        />
      </div>

      {/* ADD FORM */}
      <form
        onSubmit={
          addSubscription
        }
        className="bg-zinc-900 p-6 rounded-xl mb-10 grid md:grid-cols-4 gap-4"
      >
        <input
          type="text"
          name="platform"
          placeholder="Platform"
          value={
            formData.platform
          }
          onChange={
            handleChange
          }
          className="p-3 rounded bg-zinc-800"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={
            formData.amount
          }
          onChange={
            handleChange
          }
          className="p-3 rounded bg-zinc-800"
        />

        <input
          type="text"
          name="billingCycle"
          placeholder="Monthly / Yearly"
          value={
            formData.billingCycle
          }
          onChange={
            handleChange
          }
          className="p-3 rounded bg-zinc-800"
        />

        <input
          type="date"
          name="renewalDate"
          value={
            formData.renewalDate
          }
          onChange={
            handleChange
          }
          className="p-3 rounded bg-zinc-800"
        />

        <button
          type="submit"
          className="bg-white text-black p-3 rounded font-semibold md:col-span-4"
        >
          Add Subscription
        </button>
      </form>

      {/* SUBSCRIPTIONS */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          Your
          Subscriptions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptions.map(
            (sub) => (
              <div
                key={
                  sub._id
                }
                className="bg-zinc-900 p-6 rounded-xl"
              >
                {editingId ===
                sub._id ? (
                  <>
                    <input
                      type="text"
                      name="platform"
                      value={
                        editData.platform
                      }
                      onChange={
                        handleEditChange
                      }
                      className="w-full p-2 mb-3 rounded bg-zinc-800"
                    />

                    <input
                      type="number"
                      name="amount"
                      value={
                        editData.amount
                      }
                      onChange={
                        handleEditChange
                      }
                      className="w-full p-2 mb-3 rounded bg-zinc-800"
                    />

                    <input
                      type="text"
                      name="billingCycle"
                      value={
                        editData.billingCycle
                      }
                      onChange={
                        handleEditChange
                      }
                      className="w-full p-2 mb-3 rounded bg-zinc-800"
                    />

                    <input
                      type="date"
                      name="renewalDate"
                      value={
                        editData.renewalDate
                      }
                      onChange={
                        handleEditChange
                      }
                      className="w-full p-2 mb-3 rounded bg-zinc-800"
                    />

                    <button
                      onClick={
                        saveEdit
                      }
                      className="bg-green-500 px-4 py-2 rounded-lg mr-2"
                    >
                      Save
                    </button>

                    <button
                      onClick={() =>
                        setEditingId(
                          null
                        )
                      }
                      className="bg-gray-500 px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold mb-2">
                      {
                        sub.platform
                      }
                    </h3>

                    <p className="text-zinc-400">
                      ₹{" "}
                      {
                        sub.amount
                      }
                    </p>

                    <p className="text-zinc-400">
                      {
                        sub.billingCycle
                      }
                    </p>

                    <p className="text-zinc-400">
                      Renewal:{" "}
                      {new Date(
                        sub.renewalDate
                      ).toLocaleDateString()}
                    </p>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() =>
                          startEditing(
                            sub
                          )
                        }
                        className="bg-blue-500 px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteSubscription(
                            sub._id
                          )
                        }
                        className="bg-red-500 px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

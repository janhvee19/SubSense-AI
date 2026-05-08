"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();

  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [platform, setPlatform] = useState("");
  const [amount, setAmount] = useState("");
  const [billingCycle, setBillingCycle] = useState("");
  const [renewalDate, setRenewalDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const totalSpending = subscriptions.reduce(
    (acc, sub) => acc + Number(sub.amount),
    0
  );

  const highestExpense =
    subscriptions.length > 0
      ? subscriptions.reduce((prev, current) =>
          prev.amount > current.amount
            ? prev
            : current
        )
      : null;

  return (
    <main className="min-h-screen bg-black text-white flex">
      
      {/* SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-72 bg-zinc-950 border-r border-white/10 p-8">
        
        <h1 className="text-4xl font-bold mb-12">
          SubSense AI 🚀
        </h1>

        <nav className="space-y-4">

          <button className="w-full text-left px-5 py-4 rounded-2xl bg-white text-black font-semibold">
            Home
          </button>

          <button className="w-full text-left px-5 py-4 rounded-2xl hover:bg-white/10 transition">
            Dashboard
          </button>

          <button className="w-full text-left px-5 py-4 rounded-2xl hover:bg-white/10 transition">
            Analytics
          </button>

          <button className="w-full text-left px-5 py-4 rounded-2xl hover:bg-white/10 transition">
            OCR Scanner
          </button>

          <button className="w-full text-left px-5 py-4 rounded-2xl hover:bg-white/10 transition">
            About
          </button>

          <button className="w-full text-left px-5 py-4 rounded-2xl hover:bg-white/10 transition">
            Features
          </button>

        </nav>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 py-4 rounded-2xl font-semibold transition"
          >
            Logout
          </button>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto">

        {/* TOP NAVBAR */}
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 md:px-10 py-5 flex items-center justify-between">

          <div>
            <h2 className="text-3xl font-bold">
              Dashboard
            </h2>

            <p className="text-gray-400 mt-1">
              AI Powered Subscription Manager
            </p>
          </div>

          <div className="flex items-center gap-4">

            <button className="hidden md:block px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition">
              Notifications
            </button>

            <button
              onClick={handleLogout}
              className="px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              Logout
            </button>

          </div>

        </header>

        {/* PAGE CONTENT */}
        <div className="p-6 md:p-10 space-y-10">

          {/* HERO SECTION */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-black to-zinc-800 border border-white/10 p-10 shadow-2xl">

            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]"></div>

            <div className="relative z-10">
              <h1 className="text-5xl font-bold mb-4">
                Welcome Back 👋
              </h1>

              <p className="text-xl text-white/80 max-w-2xl">
                Manage subscriptions, track expenses,
                analyze spending patterns, and gain AI-powered
                financial insights all in one place.
              </p>
            </div>

          </section>

          {/* STATS */}
          <section className="grid md:grid-cols-3 gap-6">

            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
              <p className="text-gray-400 mb-4">
                Total Spending
              </p>

              <h2 className="text-5xl font-bold">
                ₹{totalSpending}
              </h2>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
              <p className="text-gray-400 mb-4">
                Active Subscriptions
              </p>

              <h2 className="text-5xl font-bold">
                {subscriptions.length}
              </h2>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
              <p className="text-gray-400 mb-4">
                Highest Expense
              </p>

              <h2 className="text-3xl font-bold">
                {highestExpense
                  ? highestExpense.platform
                  : "N/A"}
              </h2>
            </div>

          </section>

          {/* AI INSIGHTS */}
          <section className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-white/10 rounded-3xl p-10 shadow-2xl">

            <h2 className="text-4xl font-bold mb-8">
              AI Insights 🤖
            </h2>

            <div className="grid md:grid-cols-2 gap-8 text-lg">

              <div className="space-y-5">
                <p>
                  💰 Total Spending:
                  <span className="font-bold ml-2">
                    ₹{totalSpending}
                  </span>
                </p>

                <p>
                  🔥 Highest Expense:
                  <span className="font-bold ml-2">
                    {highestExpense
                      ? highestExpense.platform
                      : "N/A"}
                  </span>
                </p>

                <p>
                  📊 Active Plans:
                  <span className="font-bold ml-2">
                    {subscriptions.length}
                  </span>
                </p>
              </div>

              <div className="space-y-5">
                <p>
                  💡 Smart Recommendation:
                  Switch long-term subscriptions to yearly
                  plans for better savings.
                </p>

                <p>
                  ⚡ AI Suggestion:
                  Remove unused subscriptions to optimize
                  monthly expenses.
                </p>
              </div>

            </div>

          </section>

          {/* OCR SECTION */}
          <section className="bg-zinc-900 border border-white/10 rounded-3xl p-10">

            <h2 className="text-4xl font-bold mb-8">
              OCR Invoice Scanner 📄
            </h2>

            <div className="border-2 border-dashed border-white/20 rounded-3xl p-12 text-center hover:border-purple-500 transition">

              <p className="text-2xl mb-6">
                Upload Invoice or Receipt
              </p>

              <input
                type="file"
                className="bg-white/10 px-4 py-3 rounded-xl"
              />

            </div>

          </section>

          {/* ADD SUBSCRIPTION */}
          <section className="bg-zinc-900 border border-white/10 rounded-3xl p-10">

            <h2 className="text-4xl font-bold mb-8">
              Add Subscription
            </h2>

            <div className="grid md:grid-cols-4 gap-5">

              <input
                type="text"
                placeholder="Platform"
                value={platform}
                onChange={(e) =>
                  setPlatform(e.target.value)
                }
                className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
              />

              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
              />

              <input
                type="text"
                placeholder="Monthly / Yearly"
                value={billingCycle}
                onChange={(e) =>
                  setBillingCycle(e.target.value)
                }
                className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
              />

              <input
                type="date"
                value={renewalDate}
                onChange={(e) =>
                  setRenewalDate(e.target.value)
                }
                className="bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
              />

            </div>

            <button className="mt-8 w-full bg-white text-black py-4 rounded-2xl text-lg font-semibold hover:bg-gray-200 transition">
              Add Subscription
            </button>

          </section>

          {/* ABOUT SECTION */}
          <section className="bg-zinc-900 border border-white/10 rounded-3xl p-10">

            <h2 className="text-4xl font-bold mb-6">
              About SubSense AI
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              SubSense AI is a modern AI-powered subscription
              management platform designed to help users track
              recurring expenses, analyze financial behavior,
              and manage subscriptions intelligently through
              cloud deployment and OCR-based automation.
            </p>

          </section>

        </div>

      </div>

    </main>
  );
}
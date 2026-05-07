"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-6 py-10">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl">
        {/* LEFT SECTION */}
        <div className="hidden md:flex flex-col justify-center bg-black text-white p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]"></div>

          <h1 className="text-5xl font-bold leading-tight mb-6 z-10">
            Welcome to <br />
            SubSense AI
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed z-10">
            Manage subscriptions smarter with AI-powered insights,
            spending analytics, OCR invoice scanning, and automated
            subscription tracking.
          </p>

          <div className="mt-10 space-y-4 z-10">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <p>AI Expense Insights</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <p>Smart Subscription Tracking</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-purple-400"></div>
              <p>OCR Invoice Scanner</p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center justify-center p-8 md:p-12 bg-white">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>

              <p className="text-gray-500">
                Start managing your subscriptions intelligently.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-lg disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Register"}
              </button>
            </form>

            <p className="text-center mt-8 text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-black hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

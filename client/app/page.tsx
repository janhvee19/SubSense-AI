import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      
      {/* NAVBAR */}
      <nav className="w-full flex items-center justify-between px-8 md:px-16 py-6 border-b border-white/10 backdrop-blur-md">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">
            SubSense AI
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <a href="#features" className="hover:text-white transition">
            Features
          </a>

          <a href="#about" className="hover:text-white transition">
            About
          </a>

          <a href="#contact" className="hover:text-white transition">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <button className="px-5 py-2 rounded-lg border border-white/20 hover:bg-white hover:text-black transition">
              Login
            </button>
          </Link>

          <Link href="/register">
            <button className="px-5 py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition">
              Register
            </button>
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative px-8 md:px-16 py-24 md:py-32">
        
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* LEFT */}
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
              AI Powered Subscription Management
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Manage Your <br />
              Subscriptions <br />
              Smarter with AI
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl">
              Track recurring payments, analyze spending habits,
              scan invoices using OCR, and get intelligent financial
              insights — all in one centralized platform.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/register">
                <button className="px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition shadow-lg">
                  Get Started
                </button>
              </Link>

              <Link href="/login">
                <button className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white hover:text-black transition">
                  Login
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-gray-400 text-sm">
                    Monthly Expenses
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    ₹4,850
                  </h2>
                </div>

                <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">
                  +12%
                </div>
              </div>

              <div className="space-y-4">
                {[
                  "Netflix Premium",
                  "Spotify Premium",
                  "Adobe Creative Cloud",
                  "YouTube Premium",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-4 border border-white/5"
                  >
                    <div>
                      <h3 className="font-medium">{item}</h3>
                      <p className="text-sm text-gray-400">
                        Active Subscription
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₹499
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="px-8 md:px-16 py-20 bg-white text-black"
      >
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Powerful Features
            </h2>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              SubSense AI combines intelligent automation,
              analytics, and subscription tracking into one
              seamless platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {[
              {
                title: "AI Analytics",
                desc: "Get intelligent financial insights and spending analysis powered by AI.",
              },
              {
                title: "OCR Invoice Scanner",
                desc: "Automatically extract subscription details from uploaded invoices.",
              },
              {
                title: "Cloud Dashboard",
                desc: "Access your subscriptions anytime with secure cloud deployment.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-3xl border border-gray-200 hover:shadow-2xl transition bg-gray-50"
              >
                <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center mb-6 text-xl">
                  {index + 1}
                </div>

                <h3 className="text-2xl font-semibold mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="px-8 md:px-16 py-24 bg-black text-white"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8">
            Why SubSense AI?
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            Managing multiple subscriptions manually can become
            confusing and expensive. SubSense AI helps users
            monitor recurring expenses, track renewals, and gain
            financial awareness through AI-powered analytics and
            automation.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="border-t border-white/10 px-8 md:px-16 py-10 text-center text-gray-500"
      >
        <h3 className="text-2xl font-bold text-white mb-3">
          SubSense AI
        </h3>

        <p>
          AI Powered Subscription Management System
        </p>

        <p className="mt-4 text-sm">
          Developed using Next.js, Node.js, MongoDB Atlas,
          Render, and Vercel.
        </p>
      </footer>
    </main>
  );
}
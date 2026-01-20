import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../common/Footer";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Placeholder for backend endpoint
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to send reset link");
      }

      setMessage("If an account exists with that email, we have sent a password reset link.");
      setEmail("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center overflow-hidden relative p-4">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full filter blur-3xl opacity-50"></div>
        </div>

        <div className="relative z-10 w-full max-w-md p-8 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-[0_0_50px_-10px_rgba(0,0,0,0.6)]">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Forgot Password
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 rounded bg-red-500/10 border border-red-500/50 text-red-400 text-sm text-center">
                {error}
              </div>
            )}
            
            {message && (
              <div className="p-3 rounded bg-green-500/10 border border-green-500/50 text-green-400 text-sm text-center">
                {message}
              </div>
            )}

            <div className="group">
              <label htmlFor="email" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1 transition-colors group-focus-within:text-cyan-400">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:bg-black/40 focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg text-white font-bold tracking-wide
                           bg-gradient-to-r from-cyan-600 to-purple-600 
                           hover:from-cyan-500 hover:to-purple-500
                           shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 
                           border border-white/10
                           transform transition-all duration-200 hover:-translate-y-0.5
                           disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors duration-300"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Login
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;

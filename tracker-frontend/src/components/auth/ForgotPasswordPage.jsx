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
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to send reset link");
      }

      setMessage("Transmission successful. Check your inbox for reset instructions.");
      setEmail("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-black flex flex-col min-h-screen transition-colors duration-300">
      <main className="flex-grow flex items-center justify-center p-4 md:p-8 relative overflow-hidden min-h-screen">
        {/* Old Text Theme - High Opacity */}
        <div className="absolute inset-0 z-0 opacity-25 dark:opacity-10 pointer-events-none flex items-center justify-center">
            <span className="text-[15rem] font-black uppercase -rotate-12 select-none text-black dark:text-white">Recovery</span>
        </div>

        <div className="relative z-10 w-full max-w-lg bg-white dark:bg-black neo-border-thick dark:border-white neo-shadow-lg dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] p-8 md:p-12">
          <div className="mb-10 text-center">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-2 italic text-black dark:text-white">
              Forgot <span className="bg-cyan-400 px-2 not-italic text-black">Password?</span>
            </h2>
            <p className="text-black dark:text-white/80 font-bold uppercase tracking-widest text-sm">
              Initialize access recovery.
            </p>
          </div>

          {!message ? (
            <form className="space-y-8" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-500 text-white neo-border-thick dark:border-white p-3 font-black uppercase text-center text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="block text-xl font-black uppercase tracking-tight text-black dark:text-white">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full bg-white dark:bg-black neo-border-thick dark:border-white p-4 text-black dark:text-white font-bold placeholder-black/40 dark:placeholder-white/60 focus:bg-yellow-50 dark:focus:bg-yellow-400 dark:focus:text-black focus:placeholder-black dark:focus:placeholder-black outline-none transition-colors"
                  placeholder="YOUR@EMAIL.COM"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-yellow-400 text-black font-black text-2xl uppercase neo-border-thick dark:border-white neo-shadow dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] neo-transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none dark:hover:shadow-none disabled:opacity-50"
              >
                {loading ? "Sending..." : "Request Reset"}
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-6">
              <div className="inline-block p-6 bg-emerald-400 neo-border-thick dark:border-white neo-shadow dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <svg className="w-16 h-16 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight text-black dark:text-white">Email Sent</h3>
              <p className="text-xl font-bold uppercase leading-tight text-black dark:text-white/80">{message}</p>
              <div className="pt-4">
                <Link 
                  to="/login" 
                  className="inline-block bg-cyan-400 text-black font-black uppercase px-6 py-3 neo-border neo-shadow dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] neo-transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none dark:hover:shadow-none dark:border-white"
                >
                  Return to Login
                </Link>
              </div>
            </div>
          )}

          <div className="mt-12 pt-8 border-t-4 border-black dark:border-white text-center">
            <Link
              to="/login"
              className="inline-flex items-center font-black uppercase text-sm hover:underline text-black dark:text-white"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
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

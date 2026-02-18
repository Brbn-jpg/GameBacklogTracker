import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../common/Footer";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setError("Invalid or missing reset token.");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!token) {
      setError("Missing reset token.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to reset password");
      }

      setMessage("Password successfully reset! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-black flex flex-col min-h-screen transition-colors duration-300">
      <main className="flex-grow flex items-center justify-center p-4 md:p-8 relative min-h-screen overflow-hidden">
        {/* Old Text Theme - High Opacity */}
        <div className="absolute inset-0 z-0 opacity-25 dark:opacity-10 pointer-events-none flex items-center justify-center overflow-hidden">
            <span className="text-[20rem] font-black uppercase rotate-12 select-none text-black dark:text-white">Security</span>
        </div>

        <div className="relative z-10 w-full max-w-lg bg-white dark:bg-black neo-border-thick dark:border-white neo-shadow-lg p-8 md:p-12 my-auto">
          <div className="mb-10 text-center">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-2 italic text-black dark:text-white">
              Reset <span className="bg-yellow-400 px-2 not-italic text-black">Access</span>
            </h2>
            <p className="text-black dark:text-white/80 font-bold uppercase tracking-widest text-sm">
              Establish new credentials.
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
                <label htmlFor="password" class="block text-xl font-black uppercase tracking-tight text-black dark:text-white">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  className="w-full bg-white dark:bg-black neo-border-thick dark:border-white p-4 text-black dark:text-white font-bold placeholder-black/40 dark:placeholder-white/60 focus:bg-yellow-50 dark:focus:bg-yellow-400 dark:focus:text-black focus:placeholder-black dark:focus:placeholder-black outline-none transition-colors"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" class="block text-xl font-black uppercase tracking-tight text-black dark:text-white">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  className="w-full bg-white dark:bg-black neo-border-thick dark:border-white p-4 text-black dark:text-white font-bold placeholder-black/40 dark:placeholder-white/60 focus:bg-yellow-50 dark:focus:bg-yellow-400 dark:focus:text-black focus:placeholder-black dark:focus:placeholder-black outline-none transition-colors"
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !token}
                className="w-full py-5 bg-yellow-400 text-black font-black text-2xl uppercase neo-border-thick dark:border-white neo-shadow neo-transition disabled:opacity-50 hover:bg-yellow-300"
              >
                {loading ? "Updating..." : "Secure Account"}
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-6">
              <div className="inline-block p-6 bg-emerald-400 neo-border-thick dark:border-white neo-shadow">
                <svg className="w-16 h-16 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight text-black dark:text-white">Success!</h3>
              <p className="text-xl font-bold uppercase leading-tight text-black dark:text-white/80">{message}</p>
              <div className="pt-4">
                <Link 
                  to="/login" 
                  className="inline-block bg-cyan-400 text-black font-black uppercase px-6 py-3 neo-border neo-shadow neo-transition dark:border-white hover:bg-cyan-300"
                >
                  Go to Login
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

export default ResetPasswordPage;

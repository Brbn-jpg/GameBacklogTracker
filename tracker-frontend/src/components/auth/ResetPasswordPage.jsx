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
      // Placeholder for backend endpoint
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
              Reset Password
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Enter your new password below.
            </p>
          </div>

          {!message ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="p-3 rounded bg-red-500/10 border border-red-500/50 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="group">
                <label htmlFor="password" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1 transition-colors group-focus-within:text-purple-400">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:bg-black/40 focus:border-purple-500/50 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="group">
                <label htmlFor="confirmPassword" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1 transition-colors group-focus-within:text-cyan-400">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:bg-black/40 focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !token}
                className="w-full py-3.5 rounded-lg text-white font-bold tracking-wide
                             bg-gradient-to-r from-cyan-600 to-purple-600 
                             hover:from-cyan-500 hover:to-purple-500
                             shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 
                             border border-white/10
                             transform transition-all duration-200 hover:-translate-y-0.5
                             disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Success!</h3>
              <p className="text-slate-300 mb-6">{message}</p>
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
                Return to Login now
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;

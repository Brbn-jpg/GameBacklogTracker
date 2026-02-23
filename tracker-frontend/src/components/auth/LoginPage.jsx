import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import AlanWake2 from "../../assets/images/AlanWake2-screenshot.png";
import Cyberpunk from "../../assets/images/Cyberpunk-screenshot.jpg";
import DarkSouls from "../../assets/images/DarkSouls-screenshot.jpg";
import EldenRing from "../../assets/images/Elden-Ring-screenshot.jpg";
import GodOfWar from "../../assets/images/GodOfWar-screenshot.jpg";
import HollowKnight from "../../assets/images/HollowKnight-screenshot.avif";
import SilentHill2 from "../../assets/images/SilentHill2-screenshot.jpg";
import RDR2 from "../../assets/images/rdr2-screenshot.png";

const images = [
  AlanWake2,
  Cyberpunk,
  DarkSouls,
  EldenRing,
  GodOfWar,
  HollowKnight,
  SilentHill2,
  RDR2,
];

const LoginPage = () => {
  const [randomImage, setRandomImage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setRandomImage(images[Math.floor(Math.random() * images.length)]);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }
      login(data.token, rememberMe);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center relative p-4 md:p-8 bg-white dark:bg-black min-h-screen transition-colors duration-300">
      {/* Background Hero Image - Raw & Brutal */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-25 dark:opacity-25">
        {randomImage && (
          <img
            src={randomImage}
            alt="Game Background"
            className="w-full h-full object-cover grayscale"
          />
        )}
      </div>

      <div className="relative z-10 w-full max-w-lg bg-white dark:bg-black neo-border-thick dark:border-white neo-shadow-lg dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] p-8 md:p-12">
        <div className="mb-10 text-center">
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-2 italic text-black dark:text-white">
            Login{" "}
            <span className="bg-yellow-400 px-2 not-italic text-black">
              Required
            </span>
          </h2>
          <p className="text-black dark:text-white/80 font-bold uppercase tracking-widest text-sm">
            Identify yourself, gamer.
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500 text-white neo-border-thick dark:border-white p-3 font-black uppercase text-center text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xl font-black uppercase tracking-tight text-black dark:text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full bg-white dark:bg-black neo-border-thick dark:border-white p-4 text-black dark:text-white font-bold placeholder-black/60 dark:placeholder-white/60 focus:bg-yellow-50 dark:focus:bg-yellow-400 dark:focus:text-black focus:placeholder-black dark:focus:placeholder-black outline-none transition-colors"
              placeholder="YOUR@EMAIL.COM"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xl font-black uppercase tracking-tight text-black dark:text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="w-full bg-white dark:bg-black neo-border-thick dark:border-white p-4 text-black dark:text-white font-bold placeholder-black/60 dark:placeholder-white/60 focus:bg-yellow-50 dark:focus:bg-yellow-400 dark:focus:text-black focus:placeholder-black dark:focus:placeholder-black outline-none transition-colors"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer group">
              <div className="relative">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-6 h-6 neo-border-thick dark:border-white transition-colors ${rememberMe ? "bg-cyan-400" : "bg-white dark:bg-black"} flex items-center justify-center`}
                >
                  {rememberMe && (
                    <svg
                      className="w-4 h-4 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        strokeWidth="4"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="ml-3 text-sm font-black uppercase text-black dark:text-white">
                Remember Me
              </span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm font-black uppercase underline decoration-2 hover:bg-yellow-400 dark:hover:text-black transition-colors text-black dark:text-white"
            >
              Lost Access?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-yellow-400 text-black font-black text-2xl uppercase neo-border-thick dark:border-white neo-shadow dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] neo-transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none dark:hover:shadow-none disabled:opacity-50 hover:bg-yellow-300"
          >
            {loading ? "Verifying..." : "Enter System"}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t-4 border-black dark:border-white text-center space-y-6">
          <p className="font-bold uppercase text-black dark:text-white">
            No Account?{" "}
            <Link
              to="/register"
              className="bg-cyan-400 px-2 py-1 neo-border font-black hover:bg-cyan-300 transition-colors text-black"
            >
              Sign Up
            </Link>
          </p>
          <div>
            <Link
              to="/"
              className="inline-flex items-center font-black uppercase text-sm hover:underline text-black dark:text-white"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth="3"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Abort to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;

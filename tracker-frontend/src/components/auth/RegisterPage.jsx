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

const RegisterPage = () => {
  const [randomImage, setRandomImage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    retypePassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 }); // State for rotation
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
    if (formData.password !== formData.retypePassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8080/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to register");
      }
      login(data.token, rememberMe);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;

    const rotateY = ((clientX - centerX) / centerX) * -5; // Max -5 to 5 deg
    const rotateX = ((clientY - centerY) / centerY) * 5; // Max -5 to 5 deg

    setRotation({ x: rotateX, y: rotateY, z: 0 });
  };

  return (
    <main
      className="flex-grow flex items-center justify-center overflow-hidden [perspective:2000px] min-h-screen"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotation({ x: 0, y: 0, z: 0 })}
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl opacity-50 animation-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full filter blur-3xl opacity-50 animation-blob animation-delay-4000"></div>
      </div>

      <div
        className="absolute w-[85vw] h-[85vh] z-0 transition-transform duration-700 ease-out hover:scale-105"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`, // Dynamic transform
        }}
      >
        <div className="w-full h-full bg-slate-900/40 backdrop-blur-sm border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden relative">
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_40px_rgba(6,182,212,0.1)] pointer-events-none"></div>

          <div className="absolute inset-0 bg-slate-900/30 z-10"></div>

          {randomImage && (
            <img
              src={randomImage}
              alt="Game Background"
              className="w-full h-full object-cover opacity-80"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent z-20 pointer-events-none"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-[0_0_50px_-10px_rgba(0,0,0,0.6)]">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Create an Account
          </h2>
          <p className="text-slate-400 text-xs uppercase tracking-widest mt-2 font-medium">
            Join the GameLog
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="group">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1 transition-colors group-focus-within:text-cyan-400">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:bg-black/40 focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300"
              placeholder="e.g. EldenLord"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="group">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1 transition-colors group-focus-within:text-cyan-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:bg-black/40 focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="group">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1 transition-colors group-focus-within:text-purple-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:bg-black/40 focus:border-purple-500/50 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="group">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1 transition-colors group-focus-within:text-purple-400">
              Retype Password
            </label>
            <input
              type="password"
              id="retypePassword"
              className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:bg-black/40 focus:border-purple-500/50 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300"
              placeholder="••••••••"
              value={formData.retypePassword}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-white"
              >
                Remember me
              </label>
            </div>
            {/* Optionally add "Forgot password?" link here */}
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-3.5 rounded-lg text-white font-bold tracking-wide
                         bg-gradient-to-r from-cyan-600 to-purple-600 
                         hover:from-cyan-500 hover:to-purple-500
                         shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 
                         border border-white/10
                         transform transition-all duration-200 hover:-translate-y-0.5"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center space-y-4">
          <p className="text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300"
            >
              Login here
            </Link>
          </p>
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center text-xs text-slate-500 hover:text-white transition-colors duration-300"
            >
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;

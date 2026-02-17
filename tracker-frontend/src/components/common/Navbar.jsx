import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/" className="flex items-center gap-0 group">
                  <span className="text-3xl font-black uppercase tracking-tighter text-black">GAME</span>
                  <span className="text-3xl font-black uppercase tracking-tighter text-white bg-yellow-400 px-1 border-2 border-black -ml-1 z-10 transform -rotate-2 group-hover:rotate-0 transition-transform">LOG</span>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link
                  to="/games"
                  className="text-black font-black uppercase hover:bg-yellow-400 px-3 py-1 transition-colors"
                >
                  Games
                </Link>
                <Link
                  to="/blog"
                  className="text-black font-black uppercase hover:bg-yellow-400 px-3 py-1 transition-colors"
                >
                  Roadmap
                </Link>
                <Link
                  to="/contact"
                  className="text-black font-black uppercase hover:bg-yellow-400 px-3 py-1 transition-colors"
                >
                  Contact
                </Link>
                {isAuthenticated && (
                  <Link
                    to="/dashboard"
                    className="text-black font-black uppercase hover:bg-yellow-400 px-3 py-1 transition-colors underline decoration-4 decoration-cyan-400 underline-offset-4"
                  >
                    Dashboard
                  </Link>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="bg-rose-500 text-white font-black uppercase py-2 px-6 neo-border neo-shadow neo-transition"
                >
                  Logout
                </button>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/register"
                    className="bg-yellow-400 text-black font-black uppercase py-2 px-6 neo-border neo-shadow neo-transition"
                  >
                    Start Tracking
                  </Link>
                </div>
              )}
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 text-black hover:bg-yellow-400 neo-border focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <FaTimes className="block h-6 w-6" />
                ) : (
                  <FaBars className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute top-20 left-0 right-0 bg-white border-b-4 border-black p-6 shadow-xl animate-[slideDown_0.2s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              <Link
                to="/games"
                className="block neo-border-thick p-4 text-center font-black uppercase hover:bg-cyan-400 transition-colors bg-white neo-shadow"
                onClick={() => setIsMenuOpen(false)}
              >
                Games
              </Link>
              <Link
                to="/blog"
                className="block neo-border-thick p-4 text-center font-black uppercase hover:bg-yellow-400 transition-colors bg-white neo-shadow"
                onClick={() => setIsMenuOpen(false)}
              >
                Roadmap
              </Link>
              <Link
                to="/contact"
                className="block neo-border-thick p-4 text-center font-black uppercase hover:bg-emerald-400 transition-colors bg-white neo-shadow"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="block neo-border-thick p-4 text-center font-black uppercase bg-black text-white hover:bg-gray-800 transition-colors neo-shadow"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
            </div>
            <div className="pt-8 mt-4 border-t-4 border-black">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full block bg-rose-500 text-white font-black uppercase py-4 px-4 neo-border-thick neo-shadow neo-transition"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full block text-center bg-yellow-400 text-black font-black uppercase py-4 px-4 neo-border-thick neo-shadow neo-transition"
                >
                  Start Tracking
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );};

export default Navbar;

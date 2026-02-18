import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white dark:bg-black border-b-4 border-black dark:border-white transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/" className="flex items-center gap-0 group">
                  <span className="text-3xl font-black uppercase tracking-tighter text-black dark:text-white">GAME</span>
                  <span className="text-3xl font-black uppercase tracking-tighter text-white bg-yellow-400 dark:bg-yellow-500 px-1 border-2 border-black dark:border-white -ml-1 z-10 transform -rotate-2 group-hover:rotate-0 transition-transform">LOG</span>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link
                  to="/games"
                  className="text-black dark:text-white font-black uppercase hover:bg-yellow-400 dark:hover:bg-yellow-500 dark:hover:text-black px-3 py-1 transition-colors"
                >
                  Games
                </Link>
                <Link
                  to="/blog"
                  className="text-black dark:text-white font-black uppercase hover:bg-yellow-400 dark:hover:bg-yellow-500 dark:hover:text-black px-3 py-1 transition-colors"
                >
                  Roadmap
                </Link>
                <Link
                  to="/contact"
                  className="text-black dark:text-white font-black uppercase hover:bg-yellow-400 dark:hover:bg-yellow-500 dark:hover:text-black px-3 py-1 transition-colors"
                >
                  Contact
                </Link>
                {isAuthenticated && (
                  <Link
                    to="/dashboard"
                    className="text-black dark:text-white font-black uppercase hover:bg-yellow-400 dark:hover:bg-yellow-500 dark:hover:text-black px-3 py-1 transition-colors underline decoration-4 decoration-cyan-400 dark:decoration-cyan-500 underline-offset-4"
                  >
                    Dashboard
                  </Link>
                )}
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center neo-border dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </button>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="bg-rose-500 text-white font-black uppercase py-2 px-6 neo-border dark:border-white neo-shadow dark:neo-shadow-white neo-transition hover:bg-rose-600"
                >
                  Logout
                </button>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/register"
                    className="bg-yellow-400 dark:bg-yellow-500 text-black font-black uppercase py-2 px-6 neo-border dark:border-white neo-shadow dark:neo-shadow-white neo-transition hover:bg-yellow-300"
                  >
                    Start Tracking
                  </Link>
                </div>
              )}
            </div>
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center neo-border dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors"
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 text-black dark:text-white hover:bg-yellow-400 dark:hover:bg-yellow-500 dark:hover:text-black neo-border dark:border-white focus:outline-none transition-colors"
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
          className="fixed inset-0 bg-black/80 dark:bg-black/90 z-40 md:hidden transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute top-20 left-0 right-0 bg-white dark:bg-black border-b-4 border-black dark:border-white p-6 shadow-xl animate-[slideDown_0.2s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              <Link
                to="/games"
                className="block neo-border-thick dark:border-white p-4 text-center font-black uppercase bg-white dark:bg-black text-black dark:text-white hover:bg-cyan-400 dark:hover:bg-cyan-500 dark:hover:text-black transition-colors neo-shadow dark:neo-shadow-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Games
              </Link>
              <Link
                to="/blog"
                className="block neo-border-thick dark:border-white p-4 text-center font-black uppercase bg-white dark:bg-black text-black dark:text-white hover:bg-yellow-400 dark:hover:bg-yellow-500 dark:hover:text-black transition-colors neo-shadow dark:neo-shadow-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Roadmap
              </Link>
              <Link
                to="/contact"
                className="block neo-border-thick dark:border-white p-4 text-center font-black uppercase bg-white dark:bg-black text-black dark:text-white hover:bg-emerald-400 dark:hover:bg-emerald-500 dark:hover:text-black transition-colors neo-shadow dark:neo-shadow-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="block neo-border-thick dark:border-white p-4 text-center font-black uppercase bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-yellow-400 dark:hover:text-black transition-colors neo-shadow dark:neo-shadow-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
            </div>
            <div className="pt-8 mt-4 border-t-4 border-black dark:border-white">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full block bg-rose-500 text-white font-black uppercase py-4 px-4 neo-border-thick dark:border-white neo-shadow dark:neo-shadow-white neo-transition hover:bg-rose-600"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full block text-center bg-yellow-400 dark:bg-yellow-500 text-black font-black uppercase py-4 px-4 neo-border-thick dark:border-white neo-shadow dark:neo-shadow-white neo-transition hover:bg-yellow-300"
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

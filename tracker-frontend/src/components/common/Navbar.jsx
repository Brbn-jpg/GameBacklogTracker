import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
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
      <nav className="sticky top-0 z-50 bg-slate-950/50 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/">
                  <img src={logo} alt="GameLog Logo" className="h-8 w-auto" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/games"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Games
                </Link>
                <Link
                  to="/blog"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Blog
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Contact
                </Link>
                {isAuthenticated && (
                  <Link
                    to="/dashboard"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  >
                    Dashboard
                  </Link>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              {isAuthenticated ? (
                <Link
                  to="/"
                  onClick={handleLogout}
                  className="inline-block bg-red-600/50 hover:bg-red-700/75 text-white py-2 px-4 rounded-lg shadow-lg transition-colors duration-300"
                >
                  Logout
                </Link>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/register"
                    className="inline-block bg-gradient-to-r from-purple-500 to-cyan-400 text-white py-2 px-4 rounded-lg shadow-lg transition-colors duration-300"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute top-16 left-0 right-0 bg-slate-900 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1">
              <Link
                to="/games"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Games
              </Link>
              <Link
                to="/blog"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
            </div>
            <div className="pt-4 mt-4 border-t border-gray-700">
              {isAuthenticated ? (
                <div className="px-2">
                  <Link
                    to="/"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left block bg-red-600/50 hover:bg-red-700/75 text-white py-2 px-4 rounded-lg shadow-lg transition-colors duration-300"
                  >
                    Logout
                  </Link>
                </div>
              ) : (
                <div className="px-2">
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-center block bg-gradient-to-r from-purple-500 to-cyan-400 text-white py-2 px-4 rounded-lg shadow-lg transition-colors duration-300"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );};

export default Navbar;

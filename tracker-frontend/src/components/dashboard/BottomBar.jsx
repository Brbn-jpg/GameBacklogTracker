import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaThList,
  FaHeart,
  FaBars,
  FaTimes,
  FaGamepad,
  FaRss,
  FaEnvelope,
  FaSignOutAlt,
  FaCog,
  FaHome,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const BottomBar = ({ setView, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Main Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-md border-t border-white/10 z-50 md:hidden">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => setView("dashboard")}
            className={`flex flex-col items-center justify-center text-xs space-y-1 ${
              currentView === "dashboard" ? "text-neon-cyan" : "text-gray-400"
            }`}
          >
            <FaTachometerAlt className="h-6 w-6" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setView("library")}
            className={`flex flex-col items-center justify-center text-xs space-y-1 ${
              currentView === "library" ? "text-neon-cyan" : "text-gray-400"
            }`}
          >
            <FaThList className="h-6 w-6" />
            <span>Library</span>
          </button>
          <button
            onClick={() => setView("wishlist")}
            className={`flex flex-col items-center justify-center text-xs space-y-1 ${
              currentView === "wishlist" ? "text-neon-cyan" : "text-gray-400"
            }`}
          >
            <FaHeart className="h-6 w-6" />
            <span>Wishlist</span>
          </button>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center justify-center text-xs space-y-1 text-gray-400"
          >
            <FaBars className="h-6 w-6" />
            <span>More</span>
          </button>
        </div>
      </div>

      {/* "More" Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[60] md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-slate-900 rounded-t-2xl p-4 transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">More Options</h3>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-400"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            <nav>
              <ul>
                <li>
                  <Link
                    to="/games"
                    className="flex items-center p-3 text-white hover:bg-white/5 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaGamepad className="mr-3" />
                    <span>Games</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="flex items-center p-3 text-white hover:bg-white/5 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaHome className="mr-3" />
                    <span>Landing Page</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="flex items-center p-3 text-white hover:bg-white/5 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaRss className="mr-3" />
                    <span>Blog</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="flex items-center p-3 text-white hover:bg-white/5 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaEnvelope className="mr-3" />
                    <span>Contact</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setView("settings");
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center p-3 text-white hover:bg-white/5 rounded-lg"
                  >
                    <FaCog className="mr-3" />
                    <span>Settings</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center p-3 text-red-500 hover:bg-red-500/10 rounded-lg"
                  >
                    <FaSignOutAlt className="mr-3" />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomBar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import {
  FaTachometerAlt,
  FaGamepad,
  FaRss,
  FaEnvelope,
  FaThList,
  FaHeart,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";

const Sidebar = ({ setView, currentView }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="hidden md:flex w-64 flex-shrink-0 bg-slate-900/50 backdrop-blur-xl border-r border-white/10 text-white flex-col">
      <div className="p-6">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="GameLog Logo" className="h-8 w-auto" />
        </Link>
      </div>
      <nav className="mt-8 flex-grow">
        <ul className="flex-1 overflow-y-auto">
          <li>
            <button
              onClick={() => setView("dashboard")}
              className={`w-full flex items-center px-6 py-3 hover:bg-white/5 transition-colors duration-300 ${
                currentView === "dashboard" ? "text-neon-cyan" : ""
              }`}
            >
              <FaTachometerAlt className="mr-3" />
              <span>Dashboard</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => setView("library")}
              className={`w-full flex items-center px-6 py-3 hover:bg-white/5 transition-colors duration-300 ${
                currentView === "library" ? "text-neon-cyan" : ""
              }`}
            >
              <FaThList className="mr-3" />
              <span>Library</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setView("wishlist")}
              className={`w-full flex items-center px-6 py-3 hover:bg-white/5 transition-colors duration-300 ${
                currentView === "wishlist" ? "text-neon-cyan" : ""
              }`}
            >
              <FaHeart className="mr-3" />
              <span>Wishlist</span>
            </button>
          </li>
        </ul>
      </nav>
      <div className="mb-16">
        <ul className="flex-1 overflow-y-auto">
          <li>
            <Link
              to="/games"
              className="flex items-center px-6 py-3 hover:bg-white/5 transition-colors duration-300"
            >
              <FaGamepad className="mr-3" />
              <span>Games</span>
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className="flex items-center px-6 py-3 hover:bg-white/5 transition-colors duration-300"
            >
              <FaRss className="mr-3" />
              <span>Blog</span>
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="flex items-center px-6 py-3 hover:bg-white/5 transition-colors duration-300"
            >
              <FaEnvelope className="mr-3" />
              <span>Contact</span>
            </Link>
          </li>
          <li>
            <button
              onClick={() => setView("settings")}
              className={`w-full flex items-center px-6 py-3 hover:bg-white/5 transition-colors duration-300 ${
                currentView === "settings" ? "text-neon-cyan" : ""
              }`}
            >
              <FaCog className="mr-3" />
              <span>Settings</span>
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-6 py-3 text-red-500 hover:bg-red-500/20 transition-colors duration-300"
            >
              <FaSignOutAlt className="mr-3" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

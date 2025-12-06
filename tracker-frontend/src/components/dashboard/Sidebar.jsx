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
} from "react-icons/fa";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-slate-900/50 backdrop-blur-xl border-r border-white/10 text-white flex flex-col">
      <div className="p-6">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="GameLog Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold">GameLog</span>
        </Link>
      </div>
      <nav className="mt-8 flex-grow">
        <ul className="flex-1 overflow-y-auto">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center px-6 py-3 hover:bg-white/5 text-neon-cyan transition-colors duration-300"
            >
              <FaTachometerAlt className="mr-3" />
              <span>Dashboard</span>
            </Link>
          </li>
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
            <Link
              to="/library"
              className="flex items-center px-6 py-3 hover:bg-white/5 transition-colors duration-300"
            >
              <FaThList className="mr-3" />
              <span>Library</span>
            </Link>
          </li>
          <li>
            <Link
              to="/wishlist"
              className="flex items-center px-6 py-3 hover:bg-white/5 transition-colors duration-300"
            >
              <FaHeart className="mr-3" />
              <span>Wishlist</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mb-16">
        <Link
          to="/"
          onClick={handleLogout}
          className="flex items-center px-6 py-3 transition-colors duration-300 text-white hover:bg-red-600/25"
        >
          <FaSignOutAlt className="mr-3" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;

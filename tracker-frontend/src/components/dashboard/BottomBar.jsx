import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaThList,
  FaHeart,
  FaBars,
  FaTimes,
  FaGamepad,
  FaRss,
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

  const NavButton = ({ view, icon: Icon, label }) => (
    <button
      onClick={() => setView(view)}
      className={`flex flex-col items-center justify-center gap-1 transition-all ${
        currentView === view 
          ? "text-black dark:text-white scale-110" 
          : "text-black/60 dark:text-white/60"
      }`}
    >
      <Icon className="text-xl" />
      <span className="text-[10px] font-black uppercase tracking-tighter">
        {label}
      </span>
      {currentView === view && (
        <div className="w-4 h-1 bg-yellow-400 dark:bg-yellow-500 neo-border dark:border-white mt-0.5"></div>
      )}
    </button>
  );

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t-4 border-black dark:border-white z-50 md:hidden h-20 flex items-center justify-around px-2 transition-colors duration-300">
        <NavButton view="dashboard" icon={FaTachometerAlt} label="Dash" />
        <NavButton view="library" icon={FaThList} label="Lib" />
        <NavButton view="wishlist" icon={FaHeart} label="Wish" />
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex flex-col items-center justify-center gap-1 text-black dark:text-white"
        >
          <FaBars className="text-xl" />
          <span className="text-[10px] font-black uppercase tracking-tighter">
            More
          </span>
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 dark:bg-black/90 z-[60] md:hidden p-4 flex items-end transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="w-full bg-white dark:bg-black neo-border-thick dark:border-white p-6 space-y-6 animate-[slideUp_0.3s_ease-out] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b-4 border-black dark:border-white pb-4 text-black dark:text-white">
              <h3 className="text-2xl font-black uppercase tracking-tighter">
                Command Menu
              </h3>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="bg-black dark:bg-white text-white dark:text-black p-2 neo-border dark:border-white"
              >
                <FaTimes />
              </button>
            </div>

            <nav className="grid grid-cols-2 gap-4">
              <Link
                to="/games"
                className="flex items-center p-4 bg-cyan-400 dark:bg-cyan-500 neo-border dark:border-white font-black uppercase text-xs gap-3 text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaGamepad /> Games
              </Link>
              <Link
                to="/"
                className="flex items-center p-4 bg-white dark:bg-black neo-border dark:border-white font-black uppercase text-xs gap-3 text-black dark:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaHome /> Home
              </Link>
              <Link
                to="/blog"
                className="flex items-center p-4 bg-white dark:bg-black neo-border dark:border-white font-black uppercase text-xs gap-3 text-black dark:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaRss /> Roadmap
              </Link>
              <button
                onClick={() => {
                  setView("settings");
                  setIsMenuOpen(false);
                }}
                className="flex items-center p-4 bg-white dark:bg-black neo-border dark:border-white font-black uppercase text-xs gap-3 text-left text-black dark:text-white"
              >
                <FaCog /> Settings
              </button>
            </nav>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center p-4 bg-red-500 dark:bg-red-600 text-white neo-border dark:border-white font-black uppercase text-xs gap-3"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomBar;

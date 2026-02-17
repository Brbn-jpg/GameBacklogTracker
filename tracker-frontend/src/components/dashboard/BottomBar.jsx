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
        currentView === view ? "text-black scale-110" : "text-black/40"
      }`}
    >
      <Icon className="text-xl" />
      <span className="text-[10px] font-black uppercase tracking-tighter">
        {label}
      </span>
      {currentView === view && (
        <div className="w-4 h-1 bg-yellow-400 neo-border mt-0.5"></div>
      )}
    </button>
  );

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black z-50 md:hidden h-20 flex items-center justify-around px-2">
        <NavButton view="dashboard" icon={FaTachometerAlt} label="Dash" />
        <NavButton view="library" icon={FaThList} label="Lib" />
        <NavButton view="wishlist" icon={FaHeart} label="Wish" />
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex flex-col items-center justify-center gap-1 text-black"
        >
          <FaBars className="text-xl" />
          <span className="text-[10px] font-black uppercase tracking-tighter">
            More
          </span>
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-[60] md:hidden p-4 flex items-end"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="w-full bg-white neo-border-thick p-6 space-y-6 animate-[slideUp_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b-4 border-black pb-4">
              <h3 className="text-2xl font-black uppercase tracking-tighter">
                Command Menu
              </h3>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="bg-black text-white p-2 neo-border"
              >
                <FaTimes />
              </button>
            </div>

            <nav className="grid grid-cols-2 gap-4">
              <Link
                to="/games"
                className="flex items-center p-4 bg-cyan-400 neo-border font-black uppercase text-xs gap-3"
              >
                <FaGamepad /> Games
              </Link>
              <Link
                to="/"
                className="flex items-center p-4 bg-white neo-border font-black uppercase text-xs gap-3"
              >
                <FaHome /> Home
              </Link>
              <Link
                to="/blog"
                className="flex items-center p-4 bg-white neo-border font-black uppercase text-xs gap-3"
              >
                <FaRss /> Roadmap
              </Link>
              <button
                onClick={() => {
                  setView("settings");
                  setIsMenuOpen(false);
                }}
                className="flex items-center p-4 bg-white neo-border font-black uppercase text-xs gap-3 text-left"
              >
                <FaCog /> Settings
              </button>
            </nav>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center p-4 bg-red-500 text-white neo-border font-black uppercase text-xs gap-3"
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

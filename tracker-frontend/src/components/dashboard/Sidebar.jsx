import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaTachometerAlt,
  FaGamepad,
  FaThList,
  FaHeart,
  FaSignOutAlt,
  FaCog,
  FaUserFriends,
} from "react-icons/fa";

const Sidebar = ({ setView, currentView }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const NavButton = ({ view, icon: Icon, label }) => (
    <button
      onClick={() => setView(view)}
      className={`w-full flex items-center px-6 py-4 border-t-2 border-b-2 border-black font-black uppercase tracking-tighter transition-all -mt-[2px] hover:bg-yellow-400 ${
        currentView === view
          ? "bg-yellow-400 shadow-[inset_4px_0_0_0_black] z-10"
          : "bg-white"
      }`}
    >
      <Icon className="mr-3 text-xl" />
      <span>{label}</span>
    </button>
  );

  return (
    <aside className="hidden md:flex w-72 flex-shrink-0 bg-white border-r-4 border-black text-black flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="p-8 border-b-4 border-black bg-white flex justify-center">
        <Link to="/" className="flex items-center gap-0 group">
          <span className="text-4xl font-black uppercase tracking-tighter text-black">
            GAME
          </span>

          <span className="text-4xl font-black uppercase tracking-tighter text-white bg-yellow-400 px-1 border-2 border-black -ml-1 z-10 transform -rotate-2 group-hover:rotate-0 transition-transform">
            LOG
          </span>
        </Link>
      </div>

      <nav className="flex-grow">
        <div className="p-4 text-xs font-black uppercase tracking-widest text-black/40">
          Terminal
        </div>
        <NavButton view="dashboard" icon={FaTachometerAlt} label="Dashboard" />
        <NavButton view="library" icon={FaThList} label="Library" />
        <NavButton view="wishlist" icon={FaHeart} label="Wishlist" />
        <NavButton view="friends" icon={FaUserFriends} label="Friends" />

        <div className="p-4 mt-4 text-xs font-black uppercase tracking-widest text-black/40">
          System
        </div>
        <Link
          to="/games"
          className="w-full flex items-center px-6 py-4 border-t-2 border-b-2 border-black font-black uppercase tracking-tighter transition-all -mt-[2px] hover:bg-cyan-400 bg-white"
        >
          <FaGamepad className="mr-3 text-xl" />
          <span>Games</span>
        </Link>
        <NavButton view="settings" icon={FaCog} label="Settings" />
      </nav>

      <div className="mt-auto border-t-4 border-black">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-6 py-6 bg-red-500 text-white font-black uppercase tracking-tighter hover:bg-red-600 transition-colors"
        >
          <FaSignOutAlt className="mr-3 text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

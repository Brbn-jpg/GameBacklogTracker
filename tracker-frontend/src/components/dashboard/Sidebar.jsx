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
      className={`w-full flex items-center px-6 py-4 border-t-2 border-b-2 border-black dark:border-white font-black uppercase tracking-tighter transition-all -mt-[2px] hover:bg-yellow-400 dark:hover:bg-yellow-500 dark:hover:text-black ${
        currentView === view
          ? "bg-yellow-400 dark:bg-yellow-500 text-black shadow-[inset_4px_0_0_0_black] dark:shadow-[inset_4px_0_0_0_white] z-10"
          : "bg-white dark:bg-black text-black dark:text-white"
      }`}
    >
      <Icon className="mr-3 text-xl" />
      <span>{label}</span>
    </button>
  );

  return (
    <aside className="hidden md:flex w-72 flex-shrink-0 bg-white dark:bg-black border-r-4 border-black dark:border-white text-black dark:text-white flex-col h-screen sticky top-0 overflow-y-auto transition-colors duration-300">
      <div className="p-8 border-b-4 border-black dark:border-white bg-white dark:bg-black flex justify-center">
        <Link to="/" className="flex items-center gap-0 group">
          <span className="text-4xl font-black uppercase tracking-tighter text-black dark:text-white">
            GAME
          </span>

          <span className="text-4xl font-black uppercase tracking-tighter text-white bg-yellow-400 dark:bg-yellow-500 px-1 border-2 border-black dark:border-white -ml-1 z-10 transform -rotate-2 group-hover:rotate-0 transition-transform">
            LOG
          </span>
        </Link>
      </div>

      <nav className="flex-grow">
        <div className="p-4 text-xs font-black uppercase tracking-widest text-black/60 dark:text-white/60">
          Terminal
        </div>
        <NavButton view="dashboard" icon={FaTachometerAlt} label="Dashboard" />
        <NavButton view="library" icon={FaThList} label="Library" />
        <NavButton view="wishlist" icon={FaHeart} label="Wishlist" />
        <NavButton view="friends" icon={FaUserFriends} label="Friends" />

        <div className="p-4 mt-4 text-xs font-black uppercase tracking-widest text-black/60 dark:text-white/60">
          System
        </div>
        <Link
          to="/games"
          className="w-full flex items-center px-6 py-4 border-t-2 border-b-2 border-black dark:border-white font-black uppercase tracking-tighter transition-all -mt-[2px] hover:bg-cyan-400 dark:hover:bg-cyan-500 dark:hover:text-black bg-white dark:bg-black text-black dark:text-white"
        >
          <FaGamepad className="mr-3 text-xl" />
          <span>Games</span>
        </Link>
        <NavButton view="settings" icon={FaCog} label="Settings" />
      </nav>

      <div className="mt-auto border-t-4 border-black dark:border-white">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-6 py-6 bg-red-500 dark:bg-red-600 text-white font-black uppercase tracking-tighter hover:bg-red-600 dark:hover:bg-red-700 transition-colors"
        >
          <FaSignOutAlt className="mr-3 text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

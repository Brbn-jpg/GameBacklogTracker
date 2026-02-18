import React, { useState } from "react";
import Footer from "../common/Footer";
import Sidebar from "./Sidebar";
import DashboardPage from "./DashboardPage";
import Library from "../library/Library";
import Wishlist from "../wishlist/Wishlist";
import SettingsPage from "../settings/SettingsPage";
import FriendsPage from "../friends/FriendsPage";
import BottomBar from "./BottomBar"; // Import BottomBar
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [view, setView] = useState('dashboard');

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <DashboardPage />;
      case 'library':
        return <Library />;
      case 'wishlist':
        return <Wishlist />;
      case 'friends':
        return <FriendsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-white dark:bg-black flex flex-col h-screen overflow-hidden transition-colors duration-300">
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: 'neo-border-thick dark:border-white neo-shadow dark:neo-shadow-white !rounded-none !bg-white dark:!bg-black !text-black dark:!text-white font-black uppercase tracking-tight',
            duration: 4000,
            style: {
              border: '4px solid black',
              padding: '16px',
              color: 'black',
              borderRadius: '0px',
              boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
            },
            success: {
              style: {
                background: '#34D399', // emerald-400
              },
              iconTheme: {
                primary: 'black',
                secondary: 'white',
              },
            },
            error: {
              style: {
                background: '#EF4444', // red-500
                color: 'white',
              },
              iconTheme: {
                primary: 'white',
                secondary: '#EF4444',
              },
            },
          }}
        />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar setView={setView} currentView={view} />
          <main className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-black">
            <div className="flex-grow overflow-y-auto custom-scrollbar relative">
              {renderView()}
              <div className="shrink-0 z-10 relative pb-24 md:pb-0 bg-black dark:bg-black">
                <Footer />
              </div>
            </div>
          </main>
        </div>
        <BottomBar setView={setView} currentView={view} />
      </div>
    </DndProvider>
  );
};

export default Dashboard;

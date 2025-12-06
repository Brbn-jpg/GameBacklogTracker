import React, { useState } from "react";
import Footer from "../common/Footer";
import Sidebar from "./Sidebar";
import DashboardPage from "./DashboardPage";
import Library from "../library/Library";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Dashboard = () => {
  const [view, setView] = useState('dashboard');

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-slate-950 flex flex-col min-h-screen">
        <div className="flex flex-1">
          <Sidebar setView={setView} currentView={view} />
          <main className="flex-1 p-6">
            {view === 'dashboard' ? <DashboardPage /> : <Library />}
          </main>
        </div>
        <Footer />
      </div>
    </DndProvider>
  );
};

export default Dashboard;

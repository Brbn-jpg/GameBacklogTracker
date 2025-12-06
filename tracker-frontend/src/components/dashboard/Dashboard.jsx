import React from "react";
import Footer from "../common/Footer";
import Sidebar from "./Sidebar";
import DashboardPage from "./DashboardPage";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Dashboard = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-slate-950 flex flex-col min-h-screen">
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6">
            <DashboardPage />
          </main>
        </div>
        <Footer />
      </div>
    </DndProvider>
  );
};

export default Dashboard;

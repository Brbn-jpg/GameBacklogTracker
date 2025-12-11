import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MockKanbanColumn from "./MockKanbanColumn";

const initialMockColumns = {
  DITCHED: [{ id: "c1-1" }, { id: "c1-2" }, { id: "c1-3" }, { id: "c1-4" }],
  NOT_PLAYED: [{ id: "c2-1" }, { id: "c2-2" }, { id: "c2-3" }],
  PLAYING: [{ id: "c3-1" }, { id: "c3-2" }],
  COMPLETED: [{ id: "c4-1" }],
};

const Hero = () => {
  const [mockColumns, setMockColumns] = useState(initialMockColumns);

  const handleDrop = (cardId, toColumnId, fromColumnId) => {
    if (toColumnId === fromColumnId) return;

    setMockColumns((prevColumns) => {
      const fromColumn = prevColumns[fromColumnId];
      const toColumn = prevColumns[toColumnId];

      const cardToMove = fromColumn.find((card) => card.id === cardId);
      if (!cardToMove) return prevColumns;

      const newFromColumn = fromColumn.filter((card) => card.id !== cardId);
      const newToColumn = [...toColumn, cardToMove];

      return {
        ...prevColumns,
        [fromColumnId]: newFromColumn,
        [toColumnId]: newToColumn,
      };
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="relative min-h-[90vh] md:min-h-screen bg-slate-950 text-white py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-full filter blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full filter blur-3xl opacity-50 transform -translate-x-1/4 -translate-y-1/4"></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md::text-7xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
            Never Lose Track of Your Backlog
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            GameLog helps you organize your game library, track your progress,
            and conquer your backlog once and for all.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <Link
              to="/register"
              className="inline-block bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:-translate-y-1 transform transition-all duration-300"
            >
              Get Started Free
            </Link>
            <a
              href="#features"
              className="inline-block bg-white/10 border border-white/20 text-white font-bold py-3 px-8 rounded-lg backdrop-blur-md hover:-translate-y-1 transform transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Blurred Dashboard Mockup with 3D Perspective */}
        <div
          className="mt-12 hidden md:block"
          style={{ perspective: "1000px" }}
        >
          <div
            className="w-3/4 mx-auto h-[500px] rounded-lg shadow-2xl shadow-purple-500/20 transition-transform duration-700 ease-out hover:scale-105"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(1deg) rotateY(-8deg) rotateZ(0deg)",
            }}
          >
            <div className="w-full h-full rounded-lg overflow-hidden border-2 border-white/10 p-4 bg-slate-900/60 backdrop-blur-sm">
              {/* Mimic Dashboard.jsx structure: Sidebar + Main Content */}
              <div className="flex h-full w-full">
                {/* Mock Sidebar */}
                <div className="w-48 bg-slate-800/50 rounded-lg p-2 mr-4">
                  <div className="h-8 bg-slate-700/50 rounded mb-4"></div>{" "}
                  {/* Logo/Title */}
                  <div className="space-y-2 mt-4">
                    <div className="h-6 bg-slate-700/50 rounded"></div>
                    <div className="h-6 bg-slate-700/50 rounded"></div>
                    <div className="h-6 bg-slate-700/50 rounded"></div>
                    <div className="h-6 bg-slate-700/50 rounded"></div>
                  </div>
                  {/* Logout */}
                </div>

                {/* Mock Main Content Area */}
                <div className="flex-1 p-4 flex flex-col space-y-4">
                  {/* Mock UserProfile */}
                  <div className="h-16 bg-slate-800/50 rounded-lg w-full flex items-center justify-center p-3">
                    <div className="h-6 w-3/4 bg-slate-700/50 rounded"></div>
                  </div>

                  {/* Mock Stats Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    <div className="h-24 bg-slate-800/50 rounded-lg p-3 space-y-2">
                      <div className="h-4 w-3/4 bg-slate-700/50 rounded"></div>
                      <div className="h-8 w-1/2 bg-slate-700/50 rounded"></div>
                    </div>
                    <div className="h-24 bg-slate-800/50 rounded-lg p-3 space-y-2">
                      <div className="h-4 w-3/4 bg-slate-700/50 rounded"></div>
                      <div className="h-8 w-1/2 bg-slate-700/50 rounded"></div>
                    </div>
                    <div className="h-24 bg-slate-800/50 rounded-lg p-3 space-y-2">
                      <div className="h-4 w-3/4 bg-slate-700/50 rounded"></div>
                      <div className="h-8 w-1/2 bg-slate-700/50 rounded"></div>
                    </div>
                    <div className="h-24 bg-slate-800/50 rounded-lg p-3 space-y-2">
                      <div className="h-4 w-3/4 bg-slate-700/50 rounded"></div>
                      <div className="h-8 w-1/2 bg-slate-700/50 rounded"></div>
                    </div>
                  </div>

                  {/* Mock Kanban Columns */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(mockColumns).map(([statusId, cards]) => (
                      <MockKanbanColumn
                        key={statusId}
                        title={statusId.replace("_", " ")}
                        statusId={statusId}
                        cards={cards}
                        onDrop={handleDrop}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-12 text-center text-sm font-medium text-gray-400 animate-pulse hidden md:block">
          Psst! Try dragging and dropping the cards below.
        </p>
      </section>
    </DndProvider>
  );
};

export default Hero;

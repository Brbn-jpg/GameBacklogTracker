import React, { useState } from "react";
import FriendsList from "./FriendsList";
import FindFriends from "./FindFriends";
import FriendRequests from "./FriendRequests";

const FriendsPage = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleActionSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto w-full text-slate-300 font-sans min-h-screen">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between">
        <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
            Friends
            </h1>
            <p className="text-slate-400 text-lg">
            Connect with other gamers and see what they are playing.
            </p>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-2 mt-4 md:mt-0 bg-slate-900/40 p-1 rounded-xl border border-white/5">
            <button
                onClick={() => setActiveTab("list")}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "list"
                    ? "bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
            >
                My Friends
            </button>
            <button
                onClick={() => setActiveTab("find")}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "find"
                    ? "bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
            >
                Find Friends
            </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-slate-900/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl min-h-[500px]">
              {activeTab === "list" ? (
                  <>
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Your Friends
                    </h2>
                    <FriendsList key={refreshKey} />
                  </>
              ) : (
                  <>
                     <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Find New Friends
                    </h2>
                    <FindFriends />
                  </>
              )}
           </div>
        </div>

        {/* Sidebar Area */}
        <div className="lg:col-span-1 space-y-6">
           {/* Only show "Add Friend" widget if we are NOT on the find tab */}
           {activeTab !== 'find' && (
                <div className="bg-gradient-to-br from-slate-900/60 to-purple-900/20 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl">
                    <h2 className="text-lg font-bold text-white mb-3">Expand Your Squad</h2>
                    <p className="text-slate-400 text-sm mb-4">Looking for new gaming buddies? Search for users and send requests.</p>
                    <button 
                        onClick={() => setActiveTab('find')}
                        className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-purple-900/50"
                    >
                        Find Friends
                    </button>
                </div>
           )}

           <div className="bg-slate-900/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl">
             <FriendRequests onActionSuccess={handleActionSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;

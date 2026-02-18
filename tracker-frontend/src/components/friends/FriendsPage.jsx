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
    <div className="bg-white dark:bg-black min-h-screen text-black dark:text-white p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-12 border-l-8 border-black dark:border-white pl-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic text-black dark:text-white">
              Friends <span className="bg-yellow-400 dark:bg-yellow-500 px-2 not-italic text-black">List</span>
            </h1>
            <p className="text-2xl font-black uppercase tracking-widest text-black/60 dark:text-white/60 mt-4">Connect with gamers</p>
          </div>
          
          {/* Brutalist Tabs */}
          <div className="flex bg-white dark:bg-black neo-border-thick dark:border-white p-1 gap-2 neo-shadow dark:neo-shadow-white transition-colors">
            <button
              onClick={() => setActiveTab("list")}
              className={`px-6 py-2 font-black uppercase text-sm transition-all ${
                activeTab === "list"
                  ? "bg-black dark:bg-white text-white dark:text-black neo-shadow-none translate-x-[2px] translate-y-[2px]"
                  : "bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-yellow-400 dark:hover:text-black"
              }`}
            >
              My Friends
            </button>
            <button
              onClick={() => setActiveTab("find")}
              className={`px-6 py-2 font-black uppercase text-sm transition-all ${
                activeTab === "find"
                  ? "bg-black dark:bg-white text-white dark:text-black neo-shadow-none translate-x-[2px] translate-y-[2px]"
                  : "bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-yellow-400 dark:hover:text-black"
              }`}
            >
              Find Friends
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
             <div className="bg-white dark:bg-black neo-border-thick dark:border-white p-8 neo-shadow dark:neo-shadow-white min-h-[600px] transition-colors">
                <h2 className="text-3xl font-black uppercase mb-8 border-b-4 border-black dark:border-white pb-2 italic text-black dark:text-white">
                  {activeTab === "list" ? "Your Friends" : "Search Users"}
                </h2>
                {activeTab === "list" ? (
                  <FriendsList key={refreshKey} />
                ) : (
                  <FindFriends />
                )}
             </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-1 space-y-8">
             {activeTab !== 'find' && (
                  <div className="bg-yellow-400 dark:bg-yellow-500 neo-border-thick dark:border-white p-8 neo-shadow dark:neo-shadow-white transition-colors">
                      <h2 className="text-2xl font-black uppercase mb-4 tracking-tighter text-black">Add Friends</h2>
                      <p className="font-bold text-sm mb-6 leading-tight text-black">Looking for new gaming buddies? Search for users and send requests.</p>
                      <button 
                          onClick={() => setActiveTab('find')}
                          className="w-full py-4 bg-white dark:bg-black text-black dark:text-white neo-border-thick dark:border-white font-black uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none neo-shadow dark:neo-shadow-white transition-all"
                      >
                          Find Friends
                      </button>
                  </div>
             )}

             <div className="bg-white dark:bg-black neo-border-thick dark:border-white p-6 neo-shadow dark:neo-shadow-white sticky top-8 transition-colors">
               <FriendRequests onActionSuccess={handleActionSuccess} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;

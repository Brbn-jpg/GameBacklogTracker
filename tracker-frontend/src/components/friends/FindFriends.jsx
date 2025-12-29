import React, { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const FindFriends = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(0); // Reset page on new query
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const token = Cookies.get("jwt_token");
    try {
      const response = await fetch(
        `http://localhost:8080/v1/userfriend/search?query=${debouncedQuery}&page=${page}&size=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to search users");

      const data = await response.json();
      setUsers(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
      toast.error("Could not fetch users");
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const sendFriendRequest = async (username) => {
    const token = Cookies.get("jwt_token");
    try {
      const response = await fetch("http://localhost:8080/v1/userfriend/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ targetUserUsername: username }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to send request");
      }

      toast.success(`Friend request sent to ${username}`);
      // Refresh list to update status
      fetchUsers();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for gamers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:border-cyan-500 transition-colors"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute left-3 top-3.5 text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {loading ? (
        <div className="text-center text-slate-400 py-8">Searching...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-slate-800/40 border border-white/5 rounded-xl p-4 flex items-center justify-between group hover:bg-slate-800/60 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-white font-medium">{user.username}</h3>
                  <p className="text-xs text-slate-500">Gamer</p>
                </div>
              </div>

              <div>
                {user.status === "ACCEPTED" ? (
                  <span className="text-xs text-emerald-400 font-medium px-3 py-1 bg-emerald-400/10 rounded-full border border-emerald-400/20">
                    Friend
                  </span>
                ) : user.status === "PENDING" ? (
                  <span className="text-xs text-yellow-400 font-medium px-3 py-1 bg-yellow-400/10 rounded-full border border-yellow-400/20">
                    Pending
                  </span>
                ) : (
                  <button
                    onClick={() => sendFriendRequest(user.username)}
                    className="text-xs bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:border-cyan-400 px-3 py-1.5 rounded-lg transition-all flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {users.length === 0 && !loading && (
        <div className="text-center text-slate-500 py-8 italic">
          No users found. Try a different search.
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center space-x-4 mt-4">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="px-4 py-2 bg-slate-800 rounded-lg text-sm text-slate-300 disabled:opacity-50 hover:bg-slate-700 transition"
          >
            Previous
          </button>
          <span className="text-slate-400 text-sm flex items-center">
            Page {page + 1} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-slate-800 rounded-lg text-sm text-slate-300 disabled:opacity-50 hover:bg-slate-700 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default FindFriends;

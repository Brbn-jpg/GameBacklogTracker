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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(0);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const token = Cookies.get("jwt_token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/userfriend/search?query=${debouncedQuery}&page=${page}&size=10`,
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
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/userfriend/add`, {
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

      toast.success(`Request sent to ${username}`);
      fetchUsers();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <input
          type="text"
          placeholder="SEARCH USERS"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="peer w-full bg-white dark:bg-black neo-border-thick dark:border-white p-4 text-black dark:text-white font-black uppercase tracking-wide placeholder-black/40 dark:placeholder-white/60 outline-none focus:bg-yellow-50 dark:focus:bg-yellow-400 dark:focus:text-black focus:placeholder-black dark:focus:placeholder-black pl-12 transition-colors"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 absolute left-4 top-1/2 -translate-y-1/2 text-black dark:text-white peer-focus:text-black pointer-events-none transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {loading ? (
        <div className="text-center py-12 font-black uppercase italic animate-pulse text-black dark:text-white">Searching...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white dark:bg-black neo-border-thick dark:border-white p-4 flex items-center justify-between group hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all neo-shadow dark:neo-shadow-white"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-xl neo-border dark:border-white">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-tight text-black dark:text-white">{user.username}</h3>
                  <p className="text-[10px] font-bold uppercase text-black/60 dark:text-white/60">User</p>
                </div>
              </div>

              <div>
                {user.status === "ACCEPTED" ? (
                  <span className="text-xs font-black uppercase bg-emerald-400 dark:bg-emerald-500 text-black px-3 py-1 neo-border dark:border-white">
                    Friend
                  </span>
                ) : user.status === "PENDING" ? (
                  <span className="text-xs font-black uppercase bg-yellow-400 dark:bg-yellow-500 text-black px-3 py-1 neo-border dark:border-white">
                    Pending
                  </span>
                ) : (
                  <button
                    onClick={() => sendFriendRequest(user.username)}
                    className="text-xs font-black uppercase bg-white dark:bg-black hover:bg-cyan-400 dark:hover:bg-cyan-500 text-black dark:text-white hover:text-black neo-border dark:border-white px-4 py-2 transition-colors flex items-center gap-2"
                  >
                    <span>Add</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={4} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {users.length === 0 && !loading && (
        <div className="p-12 neo-border border-dashed border-black/20 dark:border-white/20 text-center">
          <p className="font-black uppercase text-black/60 dark:text-white/60">No users found.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="px-6 py-2 bg-white dark:bg-black neo-border dark:border-white font-black uppercase hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black text-black dark:text-white disabled:opacity-30 transition-colors"
          >
            Prev
          </button>
          <span className="font-black uppercase text-sm text-black dark:text-white">
            {page + 1} / {totalPages}
          </span>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            className="px-6 py-2 bg-white dark:bg-black neo-border dark:border-white font-black uppercase hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black text-black dark:text-white disabled:opacity-30 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default FindFriends;

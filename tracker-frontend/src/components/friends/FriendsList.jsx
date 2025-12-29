import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      setError(null);
      const token = Cookies.get("jwt_token");

      try {
        const response = await fetch(
          "http://localhost:8080/v1/userfriend/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch friends");
        }

        const data = await response.json();
        setFriends(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) {
    return <div className="text-slate-400 py-4">Loading friends...</div>;
  }

  if (error) {
    return <div className="text-red-500 py-4">Error: {error}</div>;
  }

  if (friends.length === 0) {
    return (
      <div className="text-center py-12 bg-white/5 rounded-xl border border-dashed border-slate-700">
        <p className="text-slate-400 text-lg mb-2">No friends found.</p>
        <p className="text-slate-500 text-sm">
          Use the search to find and add new friends!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {friends.map((friend, index) => (
        <div
          key={index}
          className="bg-slate-800/50 hover:bg-slate-800/80 border border-white/5 rounded-xl p-4 flex items-center justify-between transition-all group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
              {friend.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">
                {friend.username}
              </h3>
            </div>
          </div>

          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link
              to={`/profile/${friend.userId}`}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center"
              title="View Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </Link>
            <button
              className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
              title="Remove Friend"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;

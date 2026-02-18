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
          `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/userfriend/all`,
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
    return <div className="text-center py-8 font-black uppercase italic text-black dark:text-white">Loading Friends...</div>;
  }

  if (error) {
    return <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 neo-border dark:border-white font-bold text-center">{error}</div>;
  }

  if (friends.length === 0) {
    return (
      <div className="p-12 neo-border border-dashed border-black/20 dark:border-white/20 text-center transition-colors">
        <p className="text-xl font-black uppercase mb-2 text-black dark:text-white">No Friends</p>
        <p className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
          Use search to find new friends.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {friends.map((friend, index) => (
        <div
          key={index}
          className="bg-white dark:bg-black neo-border-thick dark:border-white p-4 flex items-center justify-between group hover:translate-x-1 hover:translate-y-1 hover:shadow-none neo-shadow dark:neo-shadow-white transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-xl neo-border dark:border-white transition-colors">
              {friend.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-black uppercase text-lg leading-none text-black dark:text-white">
                {friend.username}
              </h3>
            </div>
          </div>

          <div className="flex space-x-2">
            <Link
              to={`/profile/${friend.userId}`}
              className="p-2 bg-white dark:bg-black neo-border dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors"
              title="View Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </Link>
            <button
              className="p-2 bg-white dark:bg-black neo-border dark:border-white text-red-500 hover:bg-red-500 hover:text-white transition-colors"
              title="Remove Friend"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useAuth } from "../../context/AuthContext";

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      const token = Cookies.get("jwt_token");

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUsername(data.username);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [isAuthenticated]);

  if (loading) {
    return <div className="text-center py-4 font-black uppercase italic animate-pulse text-black dark:text-white">Initializing Profile...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900/30 neo-border-thick dark:border-white p-4 text-red-600 dark:text-red-400 font-black uppercase text-center neo-shadow dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
        Protocol Error: {error}
      </div>
    );
  }

  if (!username) return null;

  return (
    <div className="bg-white dark:bg-black neo-border-thick dark:border-white p-8 mb-10 neo-shadow dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
      <div>
        <h2 className="text-5xl font-black uppercase tracking-tighter italic text-black dark:text-white">
          Identity: <span className="bg-yellow-400 dark:bg-yellow-500 px-2 not-italic text-black">{username}</span>
        </h2>
        <p className="text-xl font-bold uppercase text-black/60 dark:text-white/60 mt-2 tracking-widest border-l-4 border-black dark:border-white pl-4">
          Status: Online / Backlog Protocol Active
        </p>
      </div>
      <div className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 font-black uppercase text-sm neo-shadow dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] tracking-widest rotate-[-2deg] transition-colors">
        Standard Issue Operative
      </div>
    </div>
  );
};

export default UserProfile;

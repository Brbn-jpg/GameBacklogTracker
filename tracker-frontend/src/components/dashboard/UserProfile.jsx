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
    return <div className="text-center py-4 font-black uppercase italic animate-pulse">Initializing Profile...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 neo-border-thick p-4 text-red-600 font-black uppercase text-center neo-shadow">
        Protocol Error: {error}
      </div>
    );
  }

  if (!username) return null;

  return (
    <div className="bg-white neo-border-thick p-8 mb-10 neo-shadow flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <h2 className="text-5xl font-black uppercase tracking-tighter italic">
          Identity: <span className="bg-yellow-400 px-2 not-italic">{username}</span>
        </h2>
        <p className="text-xl font-bold uppercase text-black/60 mt-2 tracking-widest border-l-4 border-black pl-4">
          Status: Online / Backlog Protocol Active
        </p>
      </div>
      <div className="bg-black text-white px-6 py-3 font-black uppercase text-sm neo-shadow tracking-widest rotate-[-2deg]">
        Standard Issue Operative
      </div>
    </div>
  );
};

export default UserProfile;

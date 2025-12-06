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
        const response = await fetch("http://localhost:8080/v1/users/me", {
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
    return <div className="text-center text-slate-400">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!username) {
    return (
      <div className="text-center text-slate-400">Profile not available.</div>
    );
  }

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center shadow-lg mb-8">
      <h2 className="text-3xl font-bold text-white mb-2">
        Welcome, {username}!
      </h2>
      <p className="text-slate-400">Ready to dive into your backlog?</p>
    </div>
  );
};

export default UserProfile;

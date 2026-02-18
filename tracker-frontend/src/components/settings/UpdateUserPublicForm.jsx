import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const UpdateUserPublicForm = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setIsPublic(data.isPublic ?? false);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [token]);

  const handleToggle = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/users/me/public`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isPublic: !isPublic }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update profile visibility");
      }

      const data = await response.json();
      setIsPublic(data.isPublic);
      setSuccess(`Profile is now ${data.isPublic ? "Public" : "Private"}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-black neo-border-thick dark:border-white p-8 neo-shadow dark:neo-shadow-white flex flex-col justify-between transition-colors duration-300">
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 border-b-4 border-black dark:border-white pb-2 italic text-black dark:text-white">
          Profile Visibility
        </h2>
        <p className="text-lg font-bold uppercase leading-tight mb-8 text-black/60 dark:text-white/60">
          Control who can see your game library and stats.
        </p>

        {error && (
          <div className="bg-red-500 text-white neo-border dark:border-white p-3 font-black uppercase text-sm mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-emerald-400 text-black neo-border dark:border-white p-3 font-black uppercase text-sm mb-6">
            {success}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between bg-black dark:bg-white text-white dark:text-black p-6 neo-shadow dark:neo-shadow-white rotate-[1deg] transition-colors">
        <span className="text-xl font-black uppercase tracking-widest">
          {isPublic ? "Public" : "Private"}
        </span>
        <button
          onClick={handleToggle}
          disabled={loading}
          className={`relative inline-flex h-10 w-20 items-center neo-border border-black dark:border-black transition-colors outline-none ${
            isPublic
              ? "bg-cyan-400 dark:bg-cyan-500"
              : "bg-white dark:bg-black"
          }`}
        >
          <span
            className={`${
              isPublic
                ? "translate-x-11 bg-black dark:bg-black border-white"
                : "translate-x-1 bg-black dark:bg-black border-white"
            } inline-block h-8 w-8 transform transition-transform duration-100`}
          />
        </button>
      </div>
    </div>
  );
};

export default UpdateUserPublicForm;

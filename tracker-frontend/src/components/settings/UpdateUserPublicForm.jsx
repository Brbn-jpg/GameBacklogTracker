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
        const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/users/me/public`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isPublic: !isPublic }),
      });

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
    <div className="bg-white neo-border-thick p-8 neo-shadow flex flex-col justify-between">
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 border-b-4 border-black pb-2 italic">Profile Visibility</h2>
        <p className="text-lg font-bold uppercase leading-tight mb-8 text-black/60">
          Control who can see your game library and stats.
        </p>

        {error && (
          <div className="bg-red-500 text-white neo-border p-3 font-black uppercase text-sm mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-emerald-400 text-black neo-border p-3 font-black uppercase text-sm mb-6">
            {success}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between bg-black text-white p-6 neo-shadow rotate-[1deg]">
        <span className="text-xl font-black uppercase tracking-widest">
          {isPublic ? "Public" : "Private"}
        </span>
        <button
          onClick={handleToggle}
          disabled={loading}
          className={`relative inline-flex h-10 w-20 items-center neo-border transition-colors outline-none ${
            isPublic ? "bg-cyan-400" : "bg-white"
          }`}
        >
          <span
            className={`${
              isPublic ? "translate-x-11 bg-black" : "translate-x-1 bg-black"
            } inline-block h-8 w-8 transform transition-transform duration-100`}
          />
        </button>
      </div>
    </div>
  );
};

export default UpdateUserPublicForm;

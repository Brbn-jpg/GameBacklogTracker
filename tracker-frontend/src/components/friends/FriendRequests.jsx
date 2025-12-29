import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const FriendRequests = ({ onActionSuccess }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    const token = Cookies.get("jwt_token");
    try {
      const response = await fetch("http://localhost:8080/v1/userfriend/friendRequests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch friend requests");
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRequest = async (id, action) => {
    const token = Cookies.get("jwt_token");
    try {
      const response = await fetch(`http://localhost:8080/v1/userfriend/${action}/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`Failed to ${action} request`);

      toast.success(`Friend request ${action}ed`);
      fetchRequests();
      if (onActionSuccess) onActionSuccess();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <div className="text-slate-500 text-sm text-center py-4">Loading requests...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-white">Friend Requests</h2>
        <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-0.5 rounded-full border border-rose-500/30">
          {requests.length}
        </span>
      </div>

      {requests.length === 0 ? (
        <div className="text-slate-500 text-sm italic text-center py-4 border border-dashed border-slate-700 rounded-xl">
          No pending requests.
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((req) => (
            <div key={req.id} className="bg-white/5 rounded-xl p-3 border border-white/5 flex flex-col space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-bold">
                  {req.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-slate-200 text-sm font-medium">{req.username}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleRequest(req.id, "accept")}
                  className="flex-1 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/30 transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRequest(req.id, "decline")}
                  className="flex-1 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 text-xs font-bold rounded-lg border border-rose-500/30 transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendRequests;

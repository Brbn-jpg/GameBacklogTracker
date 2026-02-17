import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const FriendRequests = ({ onActionSuccess }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    const token = Cookies.get("jwt_token");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/userfriend/friendRequests`, {
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
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/userfriend/${action}/${id}`, {
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

  if (loading) return <div className="text-center py-4 font-black uppercase italic text-xs">Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4 border-b-4 border-black pb-2">
        <h2 className="text-xl font-black uppercase tracking-tight">Friend Requests</h2>
        <span className="bg-red-500 text-white text-xs font-black px-2 py-1 neo-border">
          {requests.length}
        </span>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-black/10">
          <p className="text-xs font-black uppercase text-black/30">No pending requests.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req.id} className="bg-white neo-border p-3 flex flex-col gap-3 neo-shadow">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-black neo-border">
                  {req.username.charAt(0).toUpperCase()}
                </div>
                <span className="font-bold uppercase text-sm">{req.username}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRequest(req.id, "accept")}
                  className="flex-1 py-2 bg-emerald-400 text-black text-xs font-black uppercase neo-border hover:bg-emerald-300 transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRequest(req.id, "decline")}
                  className="flex-1 py-2 bg-red-500 text-white text-xs font-black uppercase neo-border hover:bg-red-600 transition-colors"
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

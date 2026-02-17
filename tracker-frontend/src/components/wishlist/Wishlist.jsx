import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import WishlistGameCard from "./WishlistGameCard";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchWishlist = async () => {
    setLoading(true);
    setError(null);

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/usergames`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Protocol Error: ${response.status}`);
      }

      const data = await response.json();
      const wishlistGames = data.filter((game) => game.status === "WISHLIST");
      setWishlist(wishlistGames);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  const handleRemove = async (userGameId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/usergames/${userGameId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove game from wishlist");
      }

      fetchWishlist();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white">
        <div className="text-4xl font-black uppercase tracking-tighter mb-4 italic">Retrieving Desires...</div>
        <div className="w-64 h-6 neo-border-thick overflow-hidden">
          <div className="h-full bg-cyan-400 animate-[pulse_1s_infinite]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 neo-border-thick bg-red-100 text-red-600 text-center neo-shadow max-w-2xl mx-auto">
        <h3 className="text-4xl font-black uppercase mb-4">Transmission Failed</h3>
        <p className="text-xl font-bold uppercase">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        <div className="mb-12 border-l-8 border-black pl-8 flex justify-between items-end">
          <div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">
              User <span className="bg-cyan-400 px-2 not-italic">Wishlist</span>
            </h1>
            <p className="text-2xl font-black uppercase tracking-widest text-black/40 mt-4">Sector: Pending Assets</p>
          </div>
          <div className="hidden lg:block bg-black text-white px-4 py-2 font-black uppercase text-sm neo-shadow rotate-[-2deg]">
            {wishlist.length} Targets Acquired
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="p-20 neo-border-thick text-center bg-white neo-shadow-lg flex flex-col items-center">
            <p className="text-3xl font-black uppercase mb-6 italic text-black/20 tracking-tighter">Wishlist Empty</p>
            <div className="w-20 h-20 neo-border-thick bg-white flex items-center justify-center neo-shadow mb-8">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <p className="text-xl font-bold uppercase max-w-md">No future targets logged. Access the database to flag new assets.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {wishlist.map((item) => (
              <WishlistGameCard
                key={item.id}
                game={item}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

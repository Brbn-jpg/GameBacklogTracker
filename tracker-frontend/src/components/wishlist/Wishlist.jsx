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
      const response = await fetch("http://localhost:8080/v1/usergames", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
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
        `http://localhost:8080/v1/usergames/${userGameId}`,
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
    return <div className="text-white">Loading wishlist...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold mb-8">My Wishlist</h2>
        {wishlist.length === 0 ? (
          <p className="text-slate-400">No games in wishlist</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

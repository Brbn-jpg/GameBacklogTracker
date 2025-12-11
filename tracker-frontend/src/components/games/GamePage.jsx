import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Lightbox from "../common/Lightbox";
import { useAuth } from "../../context/AuthContext";
import StarRatingInput from "../common/StarRatingInput";

const GamePage = () => {
  const { id } = useParams();
  const { isAuthenticated, token } = useAuth();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addGameStatus, setAddGameStatus] = useState(null);
  const [removeGameStatus, setRemoveGameStatus] = useState(null);
  const [updateGameStatus, setUpdateGameStatus] = useState(null);
  const [updateData, setUpdateData] = useState({ rating: "", hoursPlayed: "" });
  const [wishlistStatus, setWishlistStatus] = useState(null);

  const fetchGameData = async () => {
    setLoading(true);
    setError(null);
    try {
      const gameUrl = `http://localhost:8080/v1/games/${id}`;
      const gamePromise = fetch(gameUrl).then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      });

      let userGamePromise = Promise.resolve(null);
      if (isAuthenticated) {
        const userGamesUrl = `http://localhost:8080/v1/usergames`;
        userGamePromise = fetch(userGamesUrl, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
          if (!res.ok) return null;
          return res.json();
        });
      }

      const [gameData, userGamesData] = await Promise.all([
        gamePromise,
        userGamePromise,
      ]);

      let finalGameData = { ...gameData };
      if (userGamesData) {
        const userGame = userGamesData.find((ug) => ug.gameId === gameData.id);
        if (userGame) {
          finalGameData = { ...finalGameData, ...userGame };
          setUpdateData({
            rating: userGame.rating || "",
            hoursPlayed: userGame.hoursPlayed || "",
          });
        }
      }

      setGame(finalGameData);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGameData();
  }, [id, isAuthenticated, token]);

  const handleAddGame = async () => {
    setAddGameStatus("loading");
    try {
      const response = await fetch("http://localhost:8080/v1/usergames", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gameId: id, status: "NOT_PLAYED" }),
      });
      if (!response.ok) {
        throw new Error("Failed to add game to backlog");
      }
      setAddGameStatus("success");
      fetchGameData();
    } catch (error) {
      setAddGameStatus("error");
      console.error("Error adding game:", error);
    }
  };

  const addToWishlist = async () => {
    setWishlistStatus("loading");
    try {
      const response = await fetch(`http://localhost:8080/v1/usergames`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          gameId: id,
          status: "WISHLIST",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add game to wishlist");
      }
      setWishlistStatus("success");
      fetchGameData();
    } catch (error) {
      setWishlistStatus("error");
      console.error("Error adding to wishlist:", error);
    }
  };

  const handleRemoveGame = async () => {
    setRemoveGameStatus("loading");
    try {
      const response = await fetch(
        `http://localhost:8080/v1/usergames/${game.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to remove game");
      }
      setRemoveGameStatus("success");
      setGame({ ...game, status: null });
    } catch (error) {
      setRemoveGameStatus("error");
      console.error("Error removing game:", error);
    }
  };

  const handleMoveToBacklog = async () => {
    setUpdateGameStatus("loading");
    try {
      const response = await fetch(
        `http://localhost:8080/v1/usergames/${game.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "NOT_PLAYED" }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to move to backlog");
      }
      setUpdateGameStatus("success");
      fetchGameData();
    } catch (error) {
      setUpdateGameStatus("error");
      console.error("Error moving to backlog:", error);
    }
  };

  const handleUpdateGame = async (e) => {
    e.preventDefault();
    setUpdateGameStatus("loading");
    const parsedUpdateData = {
      ...(updateData.rating && { rating: parseInt(updateData.rating, 10) }),
      ...(updateData.hoursPlayed && {
        hoursPlayed: parseFloat(updateData.hoursPlayed),
      }),
    };

    try {
      const response = await fetch(
        `http://localhost:8080/v1/usergames/${game.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(parsedUpdateData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update game");
      }
      setUpdateGameStatus("success");
      fetchGameData();
    } catch (error) {
      setUpdateGameStatus("error");
      console.error("Error updating game:", error);
    }
  };

  const handleChange = (eOrValue, nameOverride = null) => {
    let name;
    let value;

    if (nameOverride) {
      name = nameOverride;
      value = eOrValue;
    } else if (eOrValue && eOrValue.target) {
      name = eOrValue.target.name;
      value = eOrValue.target.value;
    } else {
      console.error(
        "Invalid arguments to handleChange",
        eOrValue,
        nameOverride
      );
      return;
    }

    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  const goToNext = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === (game.screenshots?.length - 1 || 0) ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? game.screenshots?.length - 1 || 0 : prevIndex - 1
    );
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-950 text-white text-center py-8">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-slate-950 text-center py-8 text-red-500">
        Error: {error}
      </div>
    );
  if (!game)
    return (
      <div className="min-h-screen bg-slate-950 text-white text-center py-8">
        Game not found.
      </div>
    );

  return (
    <div className="bg-slate-950 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-8 text-white">
        <div
          className="relative h-96 rounded-2xl bg-cover bg-center"
          style={{ backgroundImage: `url(${game.headerImage})` }}
        >
          <div className="absolute inset-0 bg-black/50 rounded-2xl flex flex-col justify-end p-8">
            <h1 className="text-5xl font-bold">{game.name}</h1>
            <p className="text-xl text-slate-300">{game.developer}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-slate-300 leading-relaxed">
                {game.about || "No description."}
              </p>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {game.screenshots?.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Screenshot ${index + 1}`}
                    onClick={() => openLightbox(index)}
                    className="aspect-video object-cover rounded-lg cursor-pointer hover:scale-105"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 self-start">
            <h2 className="text-xl font-bold mb-4 mt">Details</h2>
            <div className="space-y-3 text-slate-300">
              <div>
                <strong className="text-white">Status:</strong>{" "}
                {game.status || "Not in library"}
              </div>
              {game.status && (
                <>
                  <div>
                    <strong className="text-white">Rating:</strong>{" "}
                    {game.rating || "N/A"}
                  </div>
                  <div>
                    <strong className="text-white">Hours:</strong>{" "}
                    {game.hoursPlayed || "0"}
                  </div>
                </>
              )}
            </div>

            {isAuthenticated && (
              <div className="mt-6">
                {!game.status && (
                  <>
                    <button
                      onClick={handleAddGame}
                      disabled={addGameStatus === "loading"}
                      className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-lg"
                    >
                      {addGameStatus === "loading"
                        ? "Adding..."
                        : "Add to Backlog"}
                    </button>
                    <button
                      onClick={addToWishlist}
                      disabled={wishlistStatus === "loading"}
                      className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded-lg mt-2"
                    >
                      {wishlistStatus === "loading"
                        ? "Adding..."
                        : "Add to Wishlist"}
                    </button>
                  </>
                )}

                {game.status === "WISHLIST" && (
                  <>
                    <button
                      onClick={handleMoveToBacklog}
                      disabled={updateGameStatus === "loading"}
                      className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg"
                    >
                      {updateGameStatus === "loading"
                        ? "Moving..."
                        : "Move to Backlog"}
                    </button>
                    <button
                      onClick={handleRemoveGame}
                      disabled={removeGameStatus === "loading"}
                      className="w-full bg-red-600 hover:bg-red-700 p-3 rounded-lg mt-2"
                    >
                      {removeGameStatus === "loading"
                        ? "Removing..."
                        : "Remove from Wishlist"}
                    </button>
                  </>
                )}

                {game.status && game.status !== "WISHLIST" && (
                  <div className="mt-6 p-4 bg-slate-800/60 rounded-xl">
                    <h3 className="text-xl font-bold mb-3">Manage Game</h3>
                    <form onSubmit={handleUpdateGame} className="space-y-4">
                      <div>
                        <label className="block mb-2">Rating</label>
                        <StarRatingInput
                          rating={parseInt(updateData.rating)}
                          onChange={(val) => handleChange(val, "rating")}
                        />
                      </div>
                      <div>
                        <label className="block mb-2">Hours Played</label>
                        <input
                          type="number"
                          value={updateData.hoursPlayed}
                          onChange={handleChange}
                          name="hoursPlayed"
                          className="w-full bg-slate-700 p-2 rounded-md"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={updateGameStatus === "loading"}
                        className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg"
                      >
                        {updateGameStatus === "loading"
                          ? "Updating..."
                          : "Update"}
                      </button>
                    </form>
                    <button
                      onClick={handleRemoveGame}
                      disabled={removeGameStatus === "loading"}
                      className="w-full bg-red-600 hover:bg-red-700 p-3 rounded-lg mt-2"
                    >
                      {removeGameStatus === "loading"
                        ? "Removing..."
                        : "Remove from Library"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      {isLightboxOpen && (
        <Lightbox
          imageUrl={game.screenshots?.[selectedImageIndex]}
          onClose={closeLightbox}
          onNext={goToNext}
          onPrev={goToPrevious}
        />
      )}
    </div>
  );
};

export default GamePage;

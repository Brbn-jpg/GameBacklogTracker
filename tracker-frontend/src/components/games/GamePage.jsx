import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Lightbox from "../common/Lightbox";
import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";
import StarRatingInput from "../common/StarRatingInput";

const GamePage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addGameStatus, setAddGameStatus] = useState(null);
  const [removeGameStatus, setRemoveGameStatus] = useState(null);
  const [updateGameStatus, setUpdateGameStatus] = useState(null);
  const [updateData, setUpdateData] = useState({ rating: "", hoursPlayed: "" });

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
        const token = Cookies.get("jwt_token");
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
  }, [id, isAuthenticated]);

  const handleAddGame = async () => {
    setAddGameStatus("loading");
    const token = Cookies.get("jwt_token");
    try {
      const response = await fetch("http://localhost:8080/v1/usergames", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gameId: id }),
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

  const handleRemoveGame = async () => {
    setRemoveGameStatus("loading");
    const token = Cookies.get("jwt_token");
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
        throw new Error("Failed to remove game from backlog");
      }
      setRemoveGameStatus("success");
      fetchGameData();
    } catch (error) {
      setRemoveGameStatus("error");
      console.error("Error removing game:", error);
    }
  };

  const handleUpdateGame = async (e) => {
    e.preventDefault();
    setUpdateGameStatus("loading");
    const token = Cookies.get("jwt_token");

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
      // This case should not happen if used correctly
      console.error(
        "Invalid arguments passed to handleChange",
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

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const goToNext = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === game.screenshots.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? game.screenshots.length - 1 : prevIndex - 1
    );
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-950 text-white text-center py-8">
        Loading game...
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
              <h2 className="text-2xl font-bold mb-4">About the Game</h2>
              <p className="text-slate-300 leading-relaxed">
                {game.about || "No description available."}
              </p>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {game.screenshots && game.screenshots.length > 0 ? (
                  game.screenshots.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Game Screenshot ${index + 1}`}
                      className="aspect-video object-cover rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:opacity-80"
                      onClick={() => openLightbox(index)}
                    />
                  ))
                ) : (
                  <p className="text-slate-400">No screenshots available.</p>
                )}
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Movies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {game.movies && game.movies.length > 0 ? (
                  game.movies.map((url, index) => (
                    <div key={index} className="aspect-video">
                      <video
                        controls
                        className="w-full h-full rounded-lg"
                        src={url}
                        title={`Game Movie ${index + 1}`}
                      ></video>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400">No movies available.</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 self-start">
            <h2 className="text-2xl font-bold mb-4">Details</h2>
            <div className="space-y-3 text-slate-300">
              <div>
                <strong className="text-white">Status:</strong>{" "}
                {game.status || "Not in library"}
              </div>
              {game.status && (
                <>
                  <div>
                    <strong className="text-white">Rating:</strong>{" "}
                    {game.rating || "Not rated"}
                  </div>
                  <div>
                    <strong className="text-white">Hours Played:</strong>{" "}
                    {game.hoursPlayed || "0"}
                  </div>
                </>
              )}
              <div>
                <strong className="text-white">Price:</strong>{" "}
                {game.price ? `$${game.price}` : "N/A"}
              </div>
              <div>
                <strong className="text-white">Release Date:</strong>{" "}
                {game.releaseDate || "N/A"}
              </div>
              <div>
                <strong className="text-white">Developers:</strong>{" "}
                {game.developers ? game.developers.join(", ") : "N/A"}
              </div>
              <div>
                <strong className="text-white">Publisher:</strong>{" "}
                {game.publishers ? game.publishers.join(", ") : "N/A"}
              </div>
              <div>
                <strong className="text-white">Genres:</strong>{" "}
                {game.genres ? game.genres.join(", ") : "N/A"}
              </div>
              <div>
                <strong className="text-white">Categories:</strong>{" "}
                {game.categories ? game.categories.join(", ") : "N/A"}
              </div>
              <div>
                <strong className="text-white">Tags:</strong>{" "}
                {game.tags && game.tags.length > 0
                  ? game.tags.join(", ")
                  : "N/A"}
              </div>
            </div>
            {isAuthenticated && !game.status && (
              <button
                onClick={handleAddGame}
                disabled={
                  addGameStatus === "loading" || addGameStatus === "success"
                }
                className="mt-6 block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200"
              >
                {addGameStatus === "loading"
                  ? "Adding..."
                  : addGameStatus === "success"
                  ? "Added!"
                  : "Add to Backlog"}
              </button>
            )}
            {addGameStatus === "error" && (
              <p className="text-red-500 text-center mt-2">
                Failed to add game.
              </p>
            )}

            {isAuthenticated && game.status && (
              <div className="mt-6 p-4 bg-slate-800/60 rounded-xl space-y-4 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">
                  Manage Game in Backlog
                </h3>
                <form onSubmit={handleUpdateGame} className="space-y-4">
                  <div>
                    <label
                      htmlFor="rating"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Your Rating (1-10)
                    </label>
                    <StarRatingInput
                      rating={parseInt(updateData.rating)}
                      onChange={(value) => handleChange(value, "rating")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="hoursPlayed"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Hours Played
                    </label>
                    <input
                      type="number"
                      name="hoursPlayed"
                      id="hoursPlayed"
                      step="0.1"
                      value={updateData.hoursPlayed}
                      onChange={handleChange}
                      className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={updateGameStatus === "loading"}
                    className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg shadow-lg disabled:opacity-50 transition-all duration-200"
                  >
                    {updateGameStatus === "loading"
                      ? "Updating..."
                      : "Update Game"}
                  </button>
                  {updateGameStatus === "error" && (
                    <p className="text-red-500 text-sm text-center mt-2">
                      Failed to update.
                    </p>
                  )}
                  {updateGameStatus === "success" && (
                    <p className="text-green-500 text-sm text-center mt-2">
                      Game updated successfully!
                    </p>
                  )}
                </form>

                <button
                  onClick={handleRemoveGame}
                  disabled={removeGameStatus === "loading"}
                  className="w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg shadow-lg disabled:opacity-50 transition-all duration-200 mt-2"
                >
                  {removeGameStatus === "loading"
                    ? "Removing..."
                    : "Remove from Backlog"}
                </button>
                {removeGameStatus === "error" && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    Failed to remove.
                  </p>
                )}
              </div>
            )}

            {game.appId && (
              <a
                href={`https://store.steampowered.com/app/${game.appId}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-full text-center bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-cyan-500/25 transform transition-all duration-200 hover:-translate-y-0.5"
              >
                View on Steam
              </a>
            )}
          </div>
        </div>
      </main>
      <Footer />

      {isLightboxOpen && (
        <Lightbox
          imageUrl={game.screenshots[selectedImageIndex]}
          onClose={closeLightbox}
          onNext={goToNext}
          onPrev={goToPrevious}
        />
      )}
    </div>
  );
};

export default GamePage;

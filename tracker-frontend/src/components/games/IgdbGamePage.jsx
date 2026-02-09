import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Lightbox from "../common/Lightbox";
import { useAuth } from "../../context/AuthContext";

const IgdbGamePage = () => {
  const { id } = useParams(); // This is the IGDB ID (appId)
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addStatus, setAddStatus] = useState("idle");

  useEffect(() => {
    const fetchGameData = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/igdb/${id}`;
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error("Game not found in IGDB");
        const data = await response.json();
        setGame(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [id, token]);

  const handleAddGame = async () => {
    setAddStatus("loading");
    try {
      // Step 1: Save to our DB
      const saveRes = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/games`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(game),
      });
      const savedGame = await saveRes.json();

      // Step 2: Add to User Backlog
      await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/usergames`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gameId: savedGame.id, status: "NOT_PLAYED" }),
      });

      setAddStatus("success");
      // Optionally redirect to the local game page
      setTimeout(() => navigate(`/games/${savedGame.id}`), 1500);
    } catch (err) {
      setAddStatus("error");
    }
  };

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  if (loading) return <div className="min-h-screen bg-slate-950 text-white text-center py-8">Loading from IGDB...</div>;
  if (error) return <div className="min-h-screen bg-slate-950 text-center py-8 text-red-500">Error: {error}</div>;
  if (!game) return null;

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
            <p className="text-xl text-slate-300">{game.developers?.join(", ")}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-slate-300 leading-relaxed">{game.about || "No description available."}</p>
            </div>
            
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {game.screenshots?.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt="Screenshot"
                    onClick={() => openLightbox(index)}
                    className="aspect-video object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Global Info</h2>
              <div className="space-y-3 text-slate-300">
                <p><strong className="text-white">Release Date:</strong> {game.releaseDate || "TBA"}</p>
                <p><strong className="text-white">Genres:</strong> {game.genres?.join(", ")}</p>
                <p><strong className="text-white">Publishers:</strong> {game.publishers?.join(", ")}</p>
              </div>

              {isAuthenticated && (
                <button
                  onClick={handleAddGame}
                  disabled={addStatus === "loading" || addStatus === "success"}
                  className={`w-full mt-6 p-4 rounded-xl font-bold transition-all ${
                    addStatus === "success" ? "bg-green-600" : "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/20"
                  }`}
                >
                  {addStatus === "loading" ? "Adding..." : addStatus === "success" ? "Added to Backlog!" : "Add to My Backlog"}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {isLightboxOpen && (
        <Lightbox
          imageUrl={game.screenshots?.[selectedImageIndex]}
          onClose={() => setIsLightboxOpen(false)}
          onNext={() => setSelectedImageIndex((i) => (i + 1) % game.screenshots.length)}
          onPrev={() => setSelectedImageIndex((i) => (i - 1 + game.screenshots.length) % game.screenshots.length)}
        />
      )}
    </div>
  );
};

export default IgdbGamePage;

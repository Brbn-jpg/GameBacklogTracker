import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LibraryGameCard from './LibraryGameCard';

const Library = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchLibrary = async () => {
      if (!token) {
        setLoading(false);
        setError(new Error('Authentication token missing.'));
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/usergames`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`System Error: ${response.status}`);
        }

        const data = await response.json();
        setGames(data.filter(game => game.status !== "WISHLIST"));
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, [token]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white">
        <div className="text-4xl font-black uppercase tracking-tighter mb-4 italic">Accessing Archives...</div>
        <div className="w-64 h-6 neo-border-thick overflow-hidden">
          <div className="h-full bg-cyan-400 animate-[pulse_1s_infinite]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 neo-border-thick bg-red-100 text-red-600 text-center neo-shadow max-w-2xl mx-auto">
        <h3 className="text-4xl font-black uppercase mb-4">Storage Failure</h3>
        <p className="text-xl font-bold uppercase">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-black p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-12 border-l-8 border-black pl-8 flex justify-between items-end">
          <div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">
              User <span className="bg-yellow-400 px-2 not-italic">Library</span>
            </h1>
            <p className="text-2xl font-black uppercase tracking-widest text-black/40 mt-4">Sector: Owned Assets</p>
          </div>
          <div className="hidden lg:block bg-black text-white px-4 py-2 font-black uppercase text-sm neo-shadow rotate-[2deg]">
            {games.length} Entries Logged
          </div>
        </div>

        {games.length === 0 ? (
          <div className="p-20 neo-border-thick text-center bg-white neo-shadow-lg flex flex-col items-center">
            <p className="text-3xl font-black uppercase mb-6 italic text-black/20 tracking-tighter">Archives Empty</p>
            <div className="w-20 h-20 neo-border-thick bg-white flex items-center justify-center neo-shadow mb-8">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-xl font-bold uppercase max-w-md">No assets found in current sector. Initialize search protocol to add data.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {games.map(game => (
              <LibraryGameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;

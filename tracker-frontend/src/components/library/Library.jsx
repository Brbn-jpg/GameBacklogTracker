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
        setError(new Error('Authentication token not found.'));
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/v1/usergames', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
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

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Library</h1>
        {loading && <p>Loading your library...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map(game => (
              <LibraryGameCard key={game.id} game={game} />
            ))}
          </div>
        )}
        {!loading && !error && games.length === 0 && (
            <p>Your library is empty. Add some games!</p>
        )}
      </div>
    </div>
  );
};

export default Library;

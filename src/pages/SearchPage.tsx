import React, { useState } from "react";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
}

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          query
        )}`
      );
      if (!response.ok) throw new Error("Failed to fetch movies");
      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Search Movies
      </h2>
      <form onSubmit={handleSearch} className="mb-8 max-w-lg mx-auto">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter movie title..."
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-blue-400 transition"
            disabled={loading}
          >
            Search
          </button>
        </div>
      </form>

      {loading && (
        <p className="text-center text-gray-600 text-lg">Loading...</p>
      )}
      {error && (
        <p className="text-center text-red-500 text-lg font-medium">{error}</p>
      )}
      {!loading && !error && movies.length === 0 && query && (
        <p className="text-center text-gray-600 text-lg">
          No movies found for "{query}".
        </p>
      )}
      {movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                  className="w-full h-[300px] object-cover"
                />
              ) : (
                <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center text-gray-500">
                  No Poster
                </div>
              )}
              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-800 truncate">
                  {movie.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {movie.release_date
                    ? movie.release_date.split("-")[0]
                    : "N/A"}
                </p>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 bg-gray-600 text-white text-sm px-3 py-1.5 rounded-md hover:bg-gray-700 transition">
                    Details
                  </button>
                  <button className="flex-1 bg-green-600 text-white text-sm px-3 py-1.5 rounded-md hover:bg-green-700 transition">
                    + Watchlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;

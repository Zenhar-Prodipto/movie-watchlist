import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { WatchlistContext } from "../context/WatchlistContext";
import { AuthContext } from "../context/AuthContext";

interface MovieDetails {
  id: number;
  title: string;
  poster_path: string | null;
  genres: { id: number; name: string }[];
  overview: string;
  release_date: string;
  vote_average: number;
}

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const watchlistContext = useContext(WatchlistContext);
  const authContext = useContext(AuthContext);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        if (!response.ok) throw new Error("Failed to fetch movie details");
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-600 text-lg p-6">Loading...</p>;
  }

  if (error || !movie) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-red-500 text-lg font-medium mb-4">
          {error || "Movie not found."}
        </p>
        <Link
          to="/search"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl relative">
      {toast && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-lg shadow-lg text-white animate-fade-in-out ${
            toast.type === "success" ? "bg-green-600" : "bg-red-500"
          }`}
          role="alert"
        >
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded"
            aria-label="Close toast"
          >
            ✕
          </button>
        </div>
      )}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={`${movie.title} poster`}
              className="w-full md:w-1/3 h-[450px] object-cover"
            />
          ) : (
            <div className="w-full md:w-1/3 h-[450px] bg-gray-200 flex items-center justify-center text-gray-500">
              No Poster
            </div>
          )}
          <div className="p-6 flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
              {movie.title}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Release Date:</span>{" "}
              {movie.release_date || "N/A"}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Genres:</span>{" "}
              {movie.genres.map((g) => g.name).join(", ") || "N/A"}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Rating:</span>{" "}
              {movie.vote_average
                ? `${movie.vote_average.toFixed(1)}/10`
                : "N/A"}
            </p>
            <p className="text-gray-700 mb-4">
              {movie.overview || "No summary available."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (!authContext?.isLoggedIn) {
                    showToast(
                      "Please log in to add to your watchlist",
                      "error"
                    );
                    return;
                  }
                  if (
                    watchlistContext?.watchlist.some((m) => m.id === movie.id)
                  ) {
                    watchlistContext?.removeFromWatchlist(movie.id);
                    showToast("Removed from watchlist.", "success");
                  } else {
                    watchlistContext?.addToWatchlist({
                      id: movie.id,
                      title: movie.title,
                      release_date: movie.release_date,
                      poster_path: movie.poster_path,
                    });
                    showToast("Added to watchlist!", "success");
                  }
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                {watchlistContext?.watchlist.some((m) => m.id === movie.id)
                  ? "Remove from Watchlist"
                  : "+ Watchlist"}
              </button>
              <Link
                to="/search"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Back to Search
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;

import React, { useState, useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";

const WatchlistPage: React.FC = () => {
  const watchlistContext = useContext(WatchlistContext);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 relative">
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
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        My Watchlist
      </h2>
      {watchlistContext?.watchlist.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          Your watchlist is empty. Add movies from the search page!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {watchlistContext?.watchlist.map((movie) => (
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
                <button
                  onClick={() => {
                    watchlistContext?.removeFromWatchlist(movie.id);
                    showToast("Removed from watchlist.", "success");
                  }}
                  className="w-full bg-red-600 text-white text-sm px-3 py-1.5 rounded-md hover:bg-red-700 transition mt-3"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;

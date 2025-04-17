import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { AuthContext } from "./AuthContext";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
}

interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
}

export const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined
);

interface WatchlistProviderProps {
  children: ReactNode;
}

export const WatchlistProvider: React.FC<WatchlistProviderProps> = ({
  children,
}) => {
  const auth = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  useEffect(() => {
    if (auth?.isLoggedIn) {
      const userId = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!).email
        : "";
      const stored = localStorage.getItem(`watchlist_${userId}`);
      setWatchlist(stored ? JSON.parse(stored) : []);
    } else {
      setWatchlist([]);
    }
  }, [auth?.isLoggedIn]);

  const addToWatchlist = (movie: Movie) => {
    if (!auth?.isLoggedIn) return;
    const userId = JSON.parse(localStorage.getItem("user")!).email;
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      const updated = [...prev, movie];
      localStorage.setItem(`watchlist_${userId}`, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromWatchlist = (movieId: number) => {
    if (!auth?.isLoggedIn) return;
    const userId = JSON.parse(localStorage.getItem("user")!).email;
    setWatchlist((prev) => {
      const updated = prev.filter((m) => m.id !== movieId);
      localStorage.setItem(`watchlist_${userId}`, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

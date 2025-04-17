import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { WatchlistProvider } from "./context/WatchlistContext";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SearchPage from "./pages/SearchPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import WatchlistPage from "./pages/WatchlistPage";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useContext(AuthContext);
  return auth?.isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WatchlistProvider>
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto">
              <Routes>
                <Route path="/search" element={<SearchPage />} />
                <Route
                  path="/watchlist"
                  element={
                    <ProtectedRoute>
                      <WatchlistPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/movie/:id" element={<MovieDetailsPage />} />
                <Route path="/" element={<SearchPage />} />
              </Routes>
            </main>
          </div>
        </WatchlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

const SearchPage: React.FC = () => (
  <div className="p-4 text-center">Search Page (Placeholder)</div>
);
const WatchlistPage: React.FC = () => (
  <div className="p-4 text-center">Watchlist Page (Placeholder)</div>
);
const LoginPage: React.FC = () => (
  <div className="p-4 text-center">Login Page (Placeholder)</div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto">
          <Routes>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<SearchPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const auth = useContext(AuthContext);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 relative">
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
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/search" className="text-xl font-bold hover:underline">
          Movie Watchlist
        </Link>
        <div className="space-x-4">
          <Link to="/search" className="hover:underline">
            Search
          </Link>
          <Link to="/watchlist" className="hover:underline">
            Watchlist
          </Link>
          {auth?.isLoggedIn ? (
            <button
              onClick={() => {
                auth?.logout();
                showToast("Logged out successfully.", "success");
              }}
              className="hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

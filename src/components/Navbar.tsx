import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <ul className="flex space-x-6 justify-center text-white font-medium">
        <li>
          <Link to="/search" className="hover:underline">
            Search
          </Link>
        </li>
        <li>
          <Link to="/watchlist" className="hover:underline">
            Watchlist
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

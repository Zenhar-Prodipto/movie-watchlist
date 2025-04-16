// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar: React.FC = () => {
//   return (
//     <nav className="bg-blue-600 p-4 shadow-md">
//       <ul className="flex space-x-6 justify-center text-white font-medium">
//         <li>
//           <Link to="/search" className="hover:underline">
//             Search
//           </Link>
//         </li>
//         <li>
//           <Link to="/watchlist" className="hover:underline">
//             Watchlist
//           </Link>
//         </li>
//         <li>
//           <Link to="/login" className="hover:underline">
//             Login
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuth = () => {
    if (auth?.isLoggedIn) {
      auth.logout();
      navigate("/search");
    } else {
      navigate("/login");
    }
  };

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
          <button onClick={handleAuth} className="hover:underline">
            {auth?.isLoggedIn ? "Logout" : "Login"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

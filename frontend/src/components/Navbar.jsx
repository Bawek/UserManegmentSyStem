import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContextProvider";

const Navbar = () => {
  const { token, navigate, setToken, searchText, handleSearchChange } =
    useContext(ShopContext);

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
    console.log("User logged out");
  };

  return (
    <nav className="bg-gradient-to-r from-green-400 to-blue-500 shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* App Name */}
        <NavLink
          className="text-white font-bold text-2xl hover:text-yellow-300"
          to="/"
        >
          Note App
        </NavLink>

        {/* Search Input */}
        <div className="flex-grow flex justify-center">
          <input
            type="text"
            value={searchText}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Search notes..."
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/add")}
            className="px-5 py-2 bg-green-700 text-white rounded-md text-lg hover:bg-green-600 transition duration-300"
          >
            Add
          </button>
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-red-600 text-white rounded-md text-lg hover:bg-red-500 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

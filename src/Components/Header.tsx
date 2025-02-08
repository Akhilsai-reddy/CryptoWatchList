import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppDispatch } from "../Redux/store";
import { searchCrypto } from "../Redux/Binance/Actions";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    dispatch(searchCrypto(e.target.value));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-5 text-white flex justify-between items-center sticky top-0 z-50 shadow-lg rounded-b-lg transition-all duration-500 ease-in-out">
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
        {/* Left part: Logo and Navigation */}
        <NavLink
          to={"/"}
          className="text-3xl font-extrabold tracking-tight text-white hover:text-indigo-200 transition duration-300 sm:text-4xl"
        >
          CryptoWatch
        </NavLink>

        {/* Right part: Desktop and mobile navigation */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search Cryptos..."
              className="p-2 pl-10 pr-4 rounded-xl bg-white text-black focus:outline-none w-32 sm:w-48 md:w-64 lg:w-72 transition-all ease-in-out duration-200"
            />
            {/* Search icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="absolute left-3 top-2.5 text-gray-500"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M18 10a8 8 0 10-8 8 8 8 0 008-8z"
              />
            </svg>
          </div>

          {/* Desktop Watchlist Link */}
          <div className="hidden sm:flex items-center space-x-6">
            <NavLink
              to={"/watchLists"}
              className="text-xl font-semibold text-white hover:text-indigo-200 transition duration-300"
            >
              My Watchlists
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden absolute top-0 right-0 left-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 shadow-lg rounded-lg">
          <div className="flex flex-col items-center space-y-6">
            <NavLink
              to={"/watchLists"}
              className="text-xl font-semibold text-white hover:text-indigo-200 transition duration-300 transform hover:scale-105"
              onClick={() => setMenuOpen(false)}
            >
              My Watchlists
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

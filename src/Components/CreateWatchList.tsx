import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/store';
import { createWatchList, removeWatchlist } from '../Redux/Watchlist/Actions';
import { Link } from 'react-router-dom';
import { FaEye, FaTrashAlt } from 'react-icons/fa';

const WatchlistManager: React.FC = () => {
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const watchlists = useSelector((state: RootState) => state.watchList.watchLists);

  const handleCreateWatchlist = () => {
    if (newWatchlistName.trim()) {
      dispatch(createWatchList(newWatchlistName.trim()));
      setNewWatchlistName('');
    }
  };

  const handleRemoveWatchlist = (watchlist: string) => {
    dispatch(removeWatchlist(watchlist)); // dispatch the action to remove the watchlist
  };

  return (
    <div className="p-8 bg-gradient-to-b from-blue-100 to-white min-h-screen">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Manage Your Crypto Watchlists</h2>

      <div className="flex mb-6">
        <input
          type="text"
          value={newWatchlistName}
          onChange={(e) => setNewWatchlistName(e.target.value)}
          className="p-4 border border-gray-600 rounded-lg w-full sm:w-1/3 mr-4 bg-gray-800 text-white placeholder-gray-400"
          placeholder="Enter Watchlist Name"
        />
        <button
          onClick={handleCreateWatchlist}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg w-2/4 sm:w-1/4 p-4 transition duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Create
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Object.keys(watchlists).length === 0 ? (
          <p className="col-span-full text-center text-gray-500 opacity-70">
            No watchlists found. Create one to get started!
          </p>
        ) : (
          Object.keys(watchlists).map((watchlist) => (
            <div
              key={watchlist}
              className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 hover:bg-gradient-to-r from-blue-50 to-indigo-100"
            >
              <h3 className="text-2xl font-semibold text-gray-800">{watchlist}</h3>
              <p className="text-gray-500 mt-2">{watchlists[watchlist].length} cryptos</p>
              <div className="flex justify-between items-center mt-6">
                <Link
                  to={`/watchlist/${watchlist}`}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                  role="button"
                  aria-label={`View ${watchlist} Watchlist`}
                >
                  <FaEye />
                 
                </Link>
                <button

                  onClick={() => handleRemoveWatchlist(watchlist)}
                  className="bg-red-600 text-white p-3 rounded-full shadow-md hover:bg-red-700 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  aria-label={`Remove ${watchlist} Watchlist`}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WatchlistManager;

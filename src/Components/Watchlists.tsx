import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { removeFromWatchlist } from "../Redux/Watchlist/Actions";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";  // Import the back arrow icon
import { RealTimePrice } from "./RealTimePrices";

const ManageWatchlist: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const watchlists = useSelector((state: RootState) => state.watchList.watchLists);

  const { selectedWatchlist } = useParams();

  const handleRemoveFromWatchlist = (crypto: any) => {
    dispatch(removeFromWatchlist(selectedWatchlist, crypto));
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="p-8 bg-gradient-to-b from-blue-100 to-white min-h-screen">
      <div className="flex gap-4 mb-8 items-center">
        <button
          onClick={handleBack}
          className="text-blue-600 font-semibold hover:underline text-lg flex items-center "
        >
          <FaArrowLeft size={20} /> 
        </button>
        <h2 className="text-4xl font-extrabold text-gray-800">{selectedWatchlist}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {selectedWatchlist &&
          watchlists[selectedWatchlist]?.map((crypto: any) => (
            <div
              key={crypto.symbol}
              className="bg-white p-6 rounded-3xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r from-blue-100 to-indigo-100"
            >
              <h3 className="text-2xl font-semibold text-gray-800">{crypto.symbol}</h3>
              <p className="text-gray-500 text-sm mb-4">{crypto.name}</p>
              <RealTimePrice symbol={crypto.symbol} lastPrice={crypto.lastPrice} />
              <p
                className={`text-sm font-medium mt-2 ${
                  crypto.priceChangePercent > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {crypto.priceChangePercent}% 24h change
              </p>
              <button
                onClick={() => handleRemoveFromWatchlist(crypto)}
                className="mt-4 py-2 px-8 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full shadow-md hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
              >
                Remove
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ManageWatchlist;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { addToWatchlist } from "../Redux/Watchlist/Actions";
import { getCriptoData } from "../Redux/Binance/Actions";

const CryptoList: React.FC = () => {
  const [selectedWatchlist, setSelectedWatchlist] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedSymbol, setSelectedSymbol] = useState<string>(""); 
  const dispatch = useDispatch<AppDispatch>();
  const cryptos = useSelector((state: RootState) => state.cryptos.filteredCriptos);
  const watchLists = useSelector((state: RootState) => state.watchList.watchLists);

  const handleAddToWatchlist = (symbol: string) => {
    if (selectedWatchlist) {
      dispatch(addToWatchlist(selectedWatchlist, symbol));
      setIsOpen(false); 
      alert(`Added to watchlist ${selectedWatchlist} successfully.`);
    } else {
      alert("Please select a watchlist before adding."); 
    }
  };

  const openModal = (symbol: string) => {
    setSelectedSymbol(symbol); 
    setIsOpen(true); 
  };

  useEffect(() => {
    console.log("loading data..");
    dispatch(getCriptoData());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-teal-100 p-6">
      {cryptos.length === 0 && <p className="text-center text-xl text-gray-600">Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {cryptos.map((crypto: any) => (
          <div
            key={crypto.symbol}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-gray-800">{crypto.symbol}</h2>
            <p className="text-gray-500 text-sm mb-3">{crypto.name}</p>
            <p className="text-xl font-bold text-gray-700">
              ${parseFloat(crypto.lastPrice).toFixed(2)}
            </p>
            <p
              className={`text-sm font-medium mt-2 ${
                crypto.priceChangePercent > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {crypto.priceChangePercent}% 24h change
            </p>

            <button
              onClick={() => openModal(crypto.symbol)} 
              className="mt-6 py-2 px-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800 transition-all duration-300"
            >
              Add to Watchlist
            </button>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-11/12 sm:w-96 flex flex-col items-center gap-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select the list you want to add to:</h2>
            <select
              className="rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white p-3 text-start w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedWatchlist}
              onChange={(event) => setSelectedWatchlist(event.target.value)}
            >
              <option value="">-- Select a watchlist --</option>
              {Object.keys(watchLists).map((list) => (
                <option key={list} value={list}>
                  {list}
                </option>
              ))}
            </select>
            <div className="flex gap-6 mt-4 w-full justify-center">
              <button
                onClick={() => handleAddToWatchlist(selectedSymbol)} 
                className="py-2 px-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-md hover:bg-blue-800 transition-all duration-300"
              >
                Add to Watchlist
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="py-2 px-6 bg-gray-600 text-white rounded-full shadow-md hover:bg-gray-700 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoList;

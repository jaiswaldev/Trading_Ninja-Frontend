"use client";

import { useState } from "react";
import { FaSyncAlt } from "react-icons/fa"; // Refresh Icon

const TradePanel = () => {
  const [quantity, setQuantity] = useState(0.01);

  return (
    <div className="bg-gray-800 p-4  shadow-lg w-[35%] text-white">
      {/* Top Section - BTC & Market Dropdown */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <img
            src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
            alt="BTC"
            className="w-4 h-4"
          />
          <span className="text-sm font-semibold">BTC</span>
          <button className="bg-gray-900 px-3 py-1 rounded-lg flex items-center space-x-1 w-3/4">
            <span className="text-sm">MARKET</span>
            <FaSyncAlt className="text-gray-400" />
          </button>
        </div>

        {/* Risk, SL, TP Buttons */}
        <div className="flex space-x-2">
          <button className="bg-gray-800 px-3 py-1 rounded-lg text-sm">
            RISK
          </button>
          <button className="bg-gray-800 px-3 py-1 rounded-lg text-sm">
            SL
          </button>
          <button className="bg-gray-800 px-3 py-1 rounded-lg text-sm">
            TP
          </button>
        </div>
      </div>

      {/* Price & Margin */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-red-500 text-lg">63,562.66</span>
        <span className="text-gray-400 text-sm">
          Margin: <span className="text-white">US$6.38 / 0.09%</span>
        </span>
        <span className="text-green-500 text-lg">63,637.66</span>
      </div>

     

      {/* Sell & Buy Buttons */}
      <div className="flex justify-between">
        <button className="bg-red-500 text-white py-2 px-5 rounded-lg w-[35%] m-3">
          SELL
        </button>
         {/* Quantity Selector */}
        <div className="flex justify-between items-center mb-4 bg-gray-900 p-2 rounded-lg">
          <button
            className="text-xl text-gray-400 px-3"
            onClick={() => setQuantity((prev) => Math.max(0.01, prev - 0.01))}
          >
            -
          </button>
          <span className="text-lg">{quantity.toFixed(2)}</span>
          <button
            className="text-xl text-gray-400 px-3"
            onClick={() => setQuantity((prev) => prev + 0.01)}
          >
            +
          </button>
        </div>

        <button className="bg-green-500 text-white py-2 px-5 rounded-lg w-[35%] m-3">
          BUY
        </button>
      </div>
    </div>
  );
};

export default TradePanel;

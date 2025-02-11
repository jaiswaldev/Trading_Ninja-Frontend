"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const MarketList = () => {
  const [markets, setMarkets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("Cryptos");

 const CryptoApi = process.env.NEXT_PUBLIC_CRYPTO_API_KEY;

  useEffect(() => {
  if (!CryptoApi) {
    console.error("Crypto API URL is missing!");
    return;
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(CryptoApi, {
        params: { vs_currency: "usd", order: "market_cap_desc" },
        mode: "cors",
      });
      console.log("Market Data:", response.data); // Debugging
      setMarkets(response.data);
    } catch (error) {
      console.error("Error fetching market data:", error);
    }
  };

  fetchData();
  const interval = setInterval(fetchData, 10000);
  return () => clearInterval(interval);
}, []);

  

  const filteredMarkets = markets.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-900 p-4 shadow-lg w-[35%] ">
      {/* Top Bar - Search & Dropdown */}
      <div className="flex justify-between items-center mb-4">
        {/* Search Bar */}
        <div className="relative w-[60%]">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        {/* Dropdown Menu */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 bg-gray-800 text-white rounded-lg border border-gray-600"
        >
          <option value="Cryptos">Cryptos</option>
          <option value="Top Gainers">Top Gainers</option>
          <option value="Top Losers">Top Losers</option>
        </select>
      </div>

      {/* Market Data Table */}
      <div className="h-80 overflow-y-auto custom-scrollbar">
        <table className="w-full text-white text-sm">
          <thead>
            <tr className="bg-gray-900 text-gray-400">
              <th className="p-2 text-left">Instrument</th>
              <th className="p-2 text-right">Bid</th>
              <th className="p-2 text-right">Ask</th>
              <th className="p-2 text-right">Spread</th>
            </tr>
          </thead>
          <tbody>
            {filteredMarkets.map((coin) => (
              <tr key={coin.id} className="border-b border-gray-800">
                <td className="p-2 flex items-center">
                  <img src={coin.image} alt={coin.name} className="w-5 h-5 mr-2" />
                  {coin.symbol.toUpperCase()}
                </td>
                <td className="p-2 text-right text-red-500">${coin.low_24h}</td>
                <td className="p-2 text-right text-green-500">${coin.high_24h}</td>
                <td className="p-2 text-right">{(coin.high_24h - coin.low_24h).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketList;
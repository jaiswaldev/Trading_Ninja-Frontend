"use client";
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const StockChart = () => {
 
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Stock Price",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  });

  
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");

 
  const [searchQuery, setSearchQuery] = useState("");

 
  const [markets, setMarkets] = useState([]);

  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const CryptoApi = process.env.NEXT_PUBLIC_CRYPTO_API_KEY;
  useEffect(() => {
    axios
      .get(CryptoApi, {
        params: { vs_currency: "usd", order: "market_cap_desc" },
        mode: "cors",
      })
      .then((response) => setMarkets(response.data))
      .catch((error) => console.error("Error fetching market data:", error));
  }, []);

  const filteredMarkets = markets.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const intervalRef = useRef();

  
  const fetchData = () => {
    const newLabel = new Date().toLocaleTimeString();
    const newData = Math.random() * 100; 
    setChartData((prevData) => ({
      labels: [...prevData.labels, newLabel],
      datasets: [
        {
          ...prevData.datasets[0],
          label: `${selectedCrypto} Price`,
          data: [...prevData.datasets[0].data, newData],
        },
      ],
    }));
  };

 
  useEffect(() => {
    if (typeof window !== "undefined") {  
      fetchData(); 
      intervalRef.current = setInterval(fetchData, 5000);
    }
  
    return () => clearInterval(intervalRef.current);
  }, [selectedCrypto]);
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Real-Time ${selectedCrypto} Price`,
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true, 
          },
          pinch: {
            enabled: true, 
          },
          mode: "x",
        },
        pan: {
          enabled: true,
          mode: "x", 
        },
      },
    },
  };

  
  const handleSelectCrypto = (crypto) => {
    setSelectedCrypto(crypto.symbol.toUpperCase());
    setSearchQuery(crypto.name); 
    setIsDropdownOpen(false); 
  };

  return (
    <div className="w-[65%] h-[60%] bg-gray-800 shadow-lg  relative p-4">
      {/* Custom Dropdown Menu */}
      <div className="relative ">
        {/* Input Field with Dropdown Toggle */}
        <div
          className="p-2 border border-gray-300 rounded-lg bg-gray-900 text-white cursor-pointer flex items-center justify-between w-[20%]"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{selectedCrypto}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute z-10 mt-2 w-[20%] bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-80 overflow-y-auto custom-scrollbar">
            {/* Search Bar */}
            <div className="p-2 border-b border-gray-700">
              <input
                type="text"
                placeholder="Search cryptocurrencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg bg-gray-800 text-white w-[90%] "
              />
            </div>

            {/* Dropdown Options */}
            {filteredMarkets.length > 0 ? (
              filteredMarkets.map((coin) => (
                <div
                  key={coin.id}
                  onClick={() => handleSelectCrypto(coin)}
                  className="p-2 hover:bg-gray-700 cursor-pointer flex items-center text-sm "
                >
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-5 h-5 mr-2"
                  />
                  <span>
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </span>
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-400">
                No matching cryptocurrencies found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="h-96">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default StockChart;
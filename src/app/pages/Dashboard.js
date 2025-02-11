"use client";
import dynamic from "next/dynamic";
import Navbar from "../components/navbar.component";

const StockChart = dynamic(() => import("../components/chart.component"), { ssr: false });
const MarketList = dynamic(() => import("../components/marketList.component"), { ssr: false });

import OrdersTable from "../components/orderTable.component";
import TradePanel from "../components/tradePanel.component";



const Dashboard = () => {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1 bg-gray-100 ">
        <div className="flex">
           <StockChart/>
           <MarketList/>
        </div>
        <div className="flex ">
          <OrdersTable />
          <TradePanel />
        </div>
    

      </div>
    </div>
  );
};

export default Dashboard;
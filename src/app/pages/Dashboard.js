import Navbar from "../components/navbar.component";
import StockChart from "../components/chart.component";
import MarketList from "../components/marketList.component";
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
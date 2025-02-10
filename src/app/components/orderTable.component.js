const OrdersTable = () => {
    const orders = [
      { type: "BUY", price: "43,500", profit: "+12.5%", time: "10:30 AM" },
      { type: "SELL", price: "42,800", profit: "-5.2%", time: "11:00 AM" },
    ];
  
    return (
      <div className="bg-gray-900 text-white p-4 w-[65%] h-full">
        <h2 className="text-lg mb-2">Positions</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Type</th>
              <th className="text-left p-2">Price</th>
              <th className="text-left p-2">Profit/Loss</th>
              <th className="text-left p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{order.type}</td>
                <td className="p-1">${order.price}</td>
                <td className="p-1">{order.profit}</td>
                <td className="p-1">{order.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default OrdersTable;
  
import { FaChartLine, FaCog, FaHome } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="  bg-gray-700 text-white flex flex-col items-center p-4">
      <FaHome className="text-2xl mb-6 cursor-pointer" />
      <FaChartLine className="text-2xl mb-6 cursor-pointer" />
      <FaCog className="text-2xl cursor-pointer " />
    </div>
  );
};

export default Navbar;

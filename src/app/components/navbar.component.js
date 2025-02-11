"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaChartLine, FaCog, FaHome } from "react-icons/fa";

const Navbar = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");

  const handleNavigation = (tab, path) => {
    setActiveTab(tab);
    router.push(path);
  };

  return (
    <div className="bg-gray-900 text-white flex flex-col items-center py-6  w-16 shadow-lg">
      <NavItem
        icon={<FaHome />}
        label="Home"
        isActive={activeTab === "home"}
        onClick={() => handleNavigation("home", "/")}
      />
      <NavItem
        icon={<FaChartLine />}
        label="Market"
        isActive={activeTab === "market"}
        onClick={() => handleNavigation("market", "/market")}
      />
      <NavItem
        icon={<FaCog />}
        label="Settings"
        isActive={activeTab === "settings"}
        onClick={() => handleNavigation("settings", "/settings")}
      />
    </div>
  );
};

// Reusable Nav Item Component
const NavItem = ({ icon, label, isActive, onClick }) => (
  <div
    className={`text-2xl mb-8 cursor-pointer transition-all duration-200 ${
      isActive ? "text-blue-400 scale-110" : "text-gray-400 hover:text-white hover:scale-105"
    }`}
    onClick={onClick}
    aria-label={label}
  >
    {icon}
  </div>
);

export default Navbar;

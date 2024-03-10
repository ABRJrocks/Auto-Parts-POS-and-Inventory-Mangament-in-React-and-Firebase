import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import {
  FiShoppingBag,
  FiBarChart2,
  FiLogOut,
  FiUser,
  FiPackage,
  FiFileText,
} from "react-icons/fi";

import { auth } from "../../../Firebase/firebase";
import { signOut } from "firebase/auth";

const MenuItem = ({ text, linkTo, isActive }) => {
  return (
    <Link
      to={linkTo}
      className={`flex items-center w-full font-medium py-4 text-lg text-left focus:outline-none pl-4 rounded-l-2xl rounded-r-full mb-2 
        ${
          isActive
            ? "bg-[#8484f0] text-white"
            : "bg-white text-lg hover:bg-[#ff8080] hover:text-white"
        }
      `}
    >
      <span className="mr-3">
        {text === "Sales" ? (
          <FiShoppingBag />
        ) : text === "Analytics" ? (
          <FiBarChart2 />
        ) : text === "Users" ? (
          <FiUser />
        ) : text === "Inventory" ? (
          <FiPackage />
        ) : text === "Generate Bill" ? (
          <FiFileText />
        ) : null}
      </span>
      {text}
    </Link>
  );
};

function Sidebar() {
  const location = useLocation();
  const menuItems = [
    { name: "Sales", link: "/sales" },
    { name: "Analytics", link: "/analytics" },
    { name: "Users", link: "/users" },
    { name: "Inventory", link: "/inventory" },
    // Add more menu items as needed
  ];

  const [selectedItem, setSelectedItem] = useState("");

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="flex flex-col p-0 pr-[30px] bg-white text-neutral-900 w-1/6 h-screen">
      <div className="flex-1 ">
        <Link
          to="/"
          className="cursor-pointer flex flex-row justify-center items-center space-x-4"
        >
          <img src={logo} alt="Logo" className="mb-4 mt-3 ml-3 h-16" />
          <p className="text-2xl font-bold">Al Rehman Autos</p>
        </Link>
        <ul className="space-y-2 mt-10">
          {menuItems.map((item, index) => (
            <li key={index}>
              <MenuItem
                text={item.name}
                linkTo={item.link}
                isActive={location.pathname === item.link}
                onClick={() => handleMenuItemClick(item.name)}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className=" ">
        <hr className=" border-t border-neutral-300 my-4 " />
        <ul className="space-y-2">
          <li>
            <Link
              to="/add-product"
              className="flex items-center w-full font-medium py-4 text-left focus:outline-none pl-4 rounded-l-2xl rounded-r-full mb-2 bg-white text-lg hover:bg-[#ff8080] hover:text-white"
            >
              <span className="mr-3">
                <FiFileText />
              </span>
              Add Product
            </Link>
            <Link
              to="/generate-bill"
              className="flex items-center w-full font-medium py-4 text-left focus:outline-none pl-4 rounded-l-2xl rounded-r-full mb-2 bg-white text-lg hover:bg-[#ff8080] hover:text-white"
            >
              <span className="mr-3">
                <FiFileText />
              </span>
              Generate Bill
            </Link>
          </li>
          <li>
            <Link
              onClick={handleLogout}
              className="flex items-center w-full font-medium py-4 text-left focus:outline-none pl-4 rounded-l-2xl rounded-r-full mb-2 bg-white text-lg hover:bg-[#ff8080] hover:text-white"
            >
              <span className="mr-3">
                <FiLogOut />
              </span>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;

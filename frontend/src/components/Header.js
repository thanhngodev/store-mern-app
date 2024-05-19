import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import logo from "../assest/img/logo.png";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        {/* logo  */}
        <div className="">
          <Link to={"/"}>
            <img className="h-14" src={logo} alt="logo" />
          </Link>
        </div>
        {/* search  */}
        <div className="hidden md:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2 ">
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none px-1 py-1 rounded-full"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white cursor-pointer">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          {/* user  */}
          <div className="relative flex justify-center">
            <div className="text-3xl cursor-pointer relative flex justify-center">
              <FaRegCircleUser />
            </div>
          </div>

          {/* cart  */}
          <Link to={"/cart"} className="text-2xl relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-sm">10</p>
            </div>
          </Link>

          <div>
            {/* <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button> */}

            <Link
              to={"/login"}
              className="px-3 py-1 rounded-lg text-white bg-red-600 hover:bg-red-700 cursor-pointer flex items-center justify-center "
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GrSearch } from "react-icons/gr";

const Header = () => {
  const [ search, setSearch ] = useState("thanh");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  }

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        {/* logo  */}
        <div className="">
          <Link to={"/"}>H-STORE</Link>
        </div>
        {/* search  */}
        <div className="hidden md:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2 ">
          <input type="text" placeholder="Search product here..." className="w-full outline-none px-1 py-1 rounded-full" onChange={handleSearch} value={search} />
          <div className="text-lg" >
            <GrSearch />
          </div>
        </div>

        <div onClick={() => setSearch('a')} >Login</div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import logo from "../assest/img/logo.png";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import API from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const [search, setSearch] = useState("");
  const [menuDisplay, setMenuDisplay] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  const handleLogout = async () => {
    const fetchData = await fetch(API.logout_user.url, {
      method: API.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/login");
    }

    if (data.error) {
      toast.error(data.message);
    }
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
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay(!menuDisplay)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {/* {user?.role === ROLE.ADMIN && ( */}
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay(!menuDisplay)}
                    >
                      Admin Panel
                    </Link>
                  {/* )} */}
                  <Link
                    to={"/profile"}
                    className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay(!menuDisplay)}
                  >
                    Profile
                  </Link>
                </nav>
              </div>
            )}
          </div>

          {/* cart  */}
          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>
              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">10</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-lg text-white bg-red-600 hover:bg-red-700 cursor-pointer flex items-center justify-center "
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

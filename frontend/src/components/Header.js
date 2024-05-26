import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import logo from "../assest/img/logo.png";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import API from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import { Popover } from "@mui/material";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const [menuDisplay, setMenuDisplay] = useState(null);

  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const open = Boolean(menuDisplay);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    if (search) {
      navigate(`/product?search=${search}`);
    }
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
    <header className=" shadow-md bg-white fixed w-full z-40 h-16">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        {/* logo  */}
        <div className="">
          <Link to={"/"}>
            <img className="h-14" src={logo} alt="logo" />
          </Link>
        </div>
        {/* search  */}
        <form
          className="hidden md:flex items-center w-full justify-between max-w-sm"
          onSubmit={handleSubmitSearch}
        >
          <div className="flex border rounded-full w-full focus-within:shadow pl-2 ">
            <input
              type="text"
              placeholder="Search product here..."
              className="w-full outline-none px-1 py-1 rounded-full"
              onChange={handleSearch}
              value={search}
            />
            <div
              className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white cursor-pointer"
              onClick={handleSubmitSearch}
            >
              <GrSearch />
            </div>
          </div>
        </form>
        <div className="flex items-center gap-7">
          {/* user  */}
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={(e) =>
                  user?.role === ROLE.ADMIN && setMenuDisplay(e.currentTarget)
                }
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full shadow-lg"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}
          </div>

          {/* cart  */}
          {user?._id && (
            <Link
              to={"/cart"}
              className="text-2xl relative no-underline text-black hover:text-black hover:bg-gray-200 p-2 rounded-full"
            >
              <span>
                <FaShoppingCart />
              </span>
              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-1 -right-2">
                <span className="text-sm">10</span>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="no-underline px-3 py-1 rounded-lg text-white bg-red-600 hover:bg-red-700 shadow-lg"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="no-underline px-3 py-1 rounded-lg text-white bg-red-600 hover:bg-red-700 cursor-pointer flex items-center justify-center shadow-lg"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      <Popover
        open={open}
        anchorEl={menuDisplay}
        onClose={() => setMenuDisplay(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <nav>
          {/* {user?.role === ROLE.ADMIN && ( */}
          <Link
            to={"/admin-panel/all-products"}
            className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 no-underline text-black"
            onClick={() => setMenuDisplay(null)}
          >
            Admin Panel
          </Link>
          {/* )} */}
          {/* <Link
            to={"/profile"}
            className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 no-underline text-black"
            onClick={() => setMenuDisplay(null)}
          >
            Profile
          </Link> */}
        </nav>
      </Popover>
    </header>
  );
};

export default Header;

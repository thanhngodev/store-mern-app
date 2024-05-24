import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import ROLE from "../common/role";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full  w-full  max-w-60 customShadow">
        <div className="h-32  flex justify-center items-center flex-col mt-4 ">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>

        {/***navigation */}
        <div>
          <nav className="grid p-4">
            <hr />
            <p className="font-bold mb-2 mt-3">Management</p>
            <Link
              to={"all-users"}
              className="px-3 py-2 hover:bg-slate-100 rounded-lg flex items-center mb-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                focusable="false"
                viewBox="0 0 12 12"
              >
                <g fill="none" stroke="currentColor">
                  <circle cx="4" cy="3.5" r="2" />
                  <path d="M7.5 10.5c-.2-1.7-1.7-3-3.5-3S.7 8.8.5 10.5m7.5-7h3.5m-3 3h3m-1.5 3h1.5" />
                </g>
              </svg>
              <span className="ml-2">Users</span>
            </Link>
            <Link
              to={"all-products"}
              className="px-3 py-2 hover:bg-slate-100 rounded-lg flex items-center mb-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                focusable="false"
                viewBox="0 0 12 12"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  d="M3.5 5.5h5m-5 2h5m-5 2h5m2-6.29V11c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h5.79c.13 0 .26.05.35.15l2.21 2.21c.1.09.15.21.15.35zM7.5.5V3c0 .28.22.5.5.5h2.5"
                />
              </svg>
              <span className="ml-2">Products</span>
            </Link>
            <Link
              to={"all-brands"}
              className="px-3 py-2 hover:bg-slate-100 hover:fill-[#0a58ca] rounded-lg flex items-center"
            >
              <svg
                className=""
                width="20"
                height="20"
                viewBox="0 0 64 64"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title />
                <g data-name="8" id="_8">
                  <path d="M48,19H38V12a1,1,0,0,0-1-1H9a1,1,0,0,0,0,2h5v6H4a1,1,0,0,0-1,1v8a1,1,0,0,0,1,1H14v6H4a1,1,0,0,0-1,1v8a1,1,0,0,0,1,1H14v6H8.88a1,1,0,0,0,0,2H37a1,1,0,0,0,1-1V45H48a1,1,0,0,0,1-1V36a1,1,0,0,0-1-1H38V29H48a1,1,0,0,0,1-1V20A1,1,0,0,0,48,19ZM16,13H36v6H16ZM5,27V21H25v6H5ZM5,43V37H25v6H5Zm31,8H16V45H36Zm11-8H27V37H47ZM36,35H16V29H36Zm11-8H27V21H47Z" />
                  <path d="M6,51H4a1,1,0,0,0,0,2H6a1,1,0,1,0,0-2Z" />
                  <path d="M4,13H6.08a1,1,0,0,0,0-2H4a1,1,0,0,0,0,2Z" />
                  <path d="M60,21a1,1,0,0,0,1-1V12a1,1,0,0,0-1-1H51a1,1,0,0,0-1,1v8a1,1,0,0,0,1,1h6v6H51a1,1,0,0,0-1,1v8a1,1,0,0,0,1,1h6v6H51a1,1,0,0,0-1,1v8a1,1,0,0,0,1,1h9a1,1,0,0,0,1-1V44a1,1,0,0,0-1-1H59V37h1a1,1,0,0,0,1-1V28a1,1,0,0,0-1-1H59V21ZM59,51H52V45h7ZM58,35H52V29h7v6ZM52,13h7v6H52Z" />
                </g>
              </svg>
              <span className="ml-2">Brands</span>
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-2">
        <div className="bg-white p-4 min-h-[calc(100vh-136px)] rounded-xl ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;

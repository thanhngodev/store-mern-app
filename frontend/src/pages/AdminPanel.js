import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import ROLE from "../common/role";
import Sidebar from "../components/Sidebar";

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
      <Sidebar />

      <main className="w-full h-full p-2">
        <div className="bg-white p-4 min-h-[calc(100vh-136px)] rounded-xl ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;

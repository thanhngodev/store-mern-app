import React, { useEffect, useState } from "react";
import API from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(API.allUser.url, {
      method: API.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-white pb-4">
      {allUser && allUser.length > 0 ? (
        <>
          <table className="w-full userTable">
            <thead>
              <tr className="bg-black text-white">
                <th>Sr.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="">
              {allUser.map((el, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{el.name || ""}</td>
                    <td>{el.email || ""}</td>
                    <td>{el.role || ""}</td>
                    <td>
                      {el.createdAt ? moment(el.createdAt).format("DD/MM/YYYY HH:mm") : ""}
                    </td>
                    <td>
                      <button
                        className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                        onClick={() => {
                          setUpdateUserDetails(el);
                          setOpenUpdateRole(true);
                        }}
                      >
                        <MdModeEdit />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {openUpdateRole && (
            <ChangeUserRole
              onClose={() => setOpenUpdateRole(false)}
              name={updateUserDetails.name}
              email={updateUserDetails.email}
              role={updateUserDetails.role}
              userId={updateUserDetails._id}
              callFunc={fetchAllUsers}
            />
          )}
        </>
      ) : (
        <div>Users Empty</div>
      )}
    </div>
  );
};

export default AllUsers;

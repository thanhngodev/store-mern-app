import React, { useEffect, useState } from "react";
import API from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit, MdDelete } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });
  const [deleleUser, setDeleleUser] = useState(null);

  const [openConfirm, setOpenConfirm] = useState(false);

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

  const handleDeleteUsers = async () => {
    const fetchData = await fetch(API.deleteUser.url + `/${deleleUser._id}`, {
      method: API.deleteUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      fetchAllUsers();
      setDeleleUser(null);
      setOpenConfirm(false);
      toast.success(dataResponse.message);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-white p-4 min-h-[calc(100vh-136px)]">
      {allUser && allUser.length > 0 ? (
        <>
          <div className="table-wrapper">
            <table className="fl-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allUser.map((el, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{el.name || ""}</td>
                      <td>{el.email || ""}</td>
                      <td>{el.role || ""}</td>
                      <td>
                        {el.createdAt
                          ? moment(el.createdAt).format("DD/MM/YYYY HH:mm")
                          : ""}
                      </td>
                      <td>
                        <button
                          className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white mr-2"
                          onClick={() => {
                            setUpdateUserDetails(el);
                            setOpenUpdateRole(true);
                          }}
                        >
                          <MdModeEdit />
                        </button>
                        <button
                          className="bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white"
                          onClick={() => {
                            setDeleleUser(el);
                            setOpenConfirm(true);
                          }}
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

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

      <Dialog
        open={openConfirm}
        onClose={() => {
          setDeleleUser(null);
          setOpenConfirm(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {deleleUser
            ? `Are you sure to delete this user ${deleleUser.email}?`
            : ""}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleleUser(null);
              setOpenConfirm(false);
            }}
            autoFocus
          >
            No
          </Button>
          <Button onClick={handleDeleteUsers}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllUsers;

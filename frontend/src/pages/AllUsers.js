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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #fff",
  boxShadow: 24,
  bgcolor: "background.paper",
  p: 2,
  borderRadius: "16px",
  padding: "24px",
};

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

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
    const fetchData = await fetch(API.deleteUser.url + `/${deleteUser._id}`, {
      method: API.deleteUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      fetchAllUsers();
      setDeleteUser(null);
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
    <>
      <div className="mb-3 font-bold text-xl">Users Management</div>
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
                            setDeleteUser(el);
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
        </>
      ) : (
        <div>Users Empty</div>
      )}

      <Modal
        open={openUpdateRole}
        onClose={() => {
          setOpenUpdateRole(false);
          setUpdateUserDetails(null);
        }}
      >
        <Box sx={style}>
          {updateUserDetails && (
            <ChangeUserRole
              onClose={() => {
                setOpenUpdateRole(false);
                setUpdateUserDetails(null);
              }}
              name={updateUserDetails.name}
              email={updateUserDetails.email}
              role={updateUserDetails.role}
              userId={updateUserDetails._id}
              callFunc={fetchAllUsers}
            />
          )}
        </Box>
      </Modal>

      <Dialog
        open={openConfirm}
        onClose={() => {
          setDeleteUser(null);
          setOpenConfirm(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ container: "dialog-custom-confirm" }}
      >
        <DialogTitle id="alert-dialog-title">
          {deleteUser
            ? `Are you sure to delete this user ${deleteUser.email}?`
            : ""}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteUser(null);
              setOpenConfirm(false);
            }}
            autoFocus
          >
            No
          </Button>
          <Button onClick={handleDeleteUsers}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllUsers;

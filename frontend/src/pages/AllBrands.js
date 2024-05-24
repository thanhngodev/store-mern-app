import React, { useEffect, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import CreateOrDetailBrand from "../components/CreateOrDetailBrand";
import API from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit, MdDelete } from "react-icons/md";

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

const AllBrands = () => {
  const [allBrands, setAllBrands] = useState([]);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteBrand, setDeleteBrand] = useState(null);

  const [openAddBrand, setOpenAddBrand] = useState(false);
  const [brandDetails, setBrandDetails] = useState(null);

  const fetchAllBrands = async () => {
    const fetchData = await fetch(API.getBrand.url, {
      method: API.getBrand.method,
      credentials: "include",
    });
    const dataResponse = await fetchData.json();
    if (dataResponse.success) {
      setAllBrands(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllBrands();
  }, []);

  const handleDeleteBrands = async () => {
    const fetchData = await fetch(API.deleteBrand.url + `/${deleteBrand._id}`, {
      method: API.deleteBrand.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      fetchAllBrands();
      setDeleteBrand(null);
      setOpenConfirm(false);
      toast.success(dataResponse.message);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  const handleChangeStatusBrand = async (event, itemUPdate) => {
    const fetchData = await fetch(API.updateBrand.url + `/${itemUPdate._id}`, {
      method: API.updateBrand.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        code: itemUPdate.code,
        name: itemUPdate.name,
        status: event.target.checked,
      }),
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      fetchAllBrands();
      toast.success(dataResponse.message);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  return (
    <>
      <div className="mb-3 flex justify-between items-center">
        <div className=" font-bold text-xl">Brands Management</div>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
          onClick={() => setOpenAddBrand(true)}
        >
          Add Brand
        </button>
      </div>

      {allBrands && allBrands.length > 0 ? (
        <>
          <div className="table-wrapper">
            <table className="fl-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Updated Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allBrands.map((el, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{el.name || ""}</td>
                      <td>{el.code || ""}</td>
                      <td>
                        {el.updatedAt
                          ? moment(el.updatedAt).format("DD/MM/YYYY HH:mm")
                          : ""}
                      </td>
                      <td>
                        <Switch
                          checked={el.status}
                          onChange={(event) =>
                            handleChangeStatusBrand(event, el)
                          }
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </td>
                      <td>
                        <button
                          className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white mr-2"
                          onClick={() => {
                            setBrandDetails(el);
                            setOpenAddBrand(true);
                          }}
                        >
                          <MdModeEdit />
                        </button>
                        <button
                          className="bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white"
                          onClick={() => {
                            setDeleteBrand(el);
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

      <Modal open={openAddBrand} onClose={() => {
        setOpenAddBrand(false);
        setBrandDetails(null);
      }}>
        <Box sx={style}>
          <CreateOrDetailBrand
            openModal={openAddBrand}
            brandDetails={brandDetails}
            onClose={() => {
              setOpenAddBrand(false);
              setBrandDetails(null);
            }}
            callFunc={fetchAllBrands}
          />
        </Box>
      </Modal>

      <Dialog
        open={openConfirm}
        onClose={() => {
          setDeleteBrand(null);
          setOpenConfirm(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ container: "dialog-custom-confirm" }}
      >
        <DialogTitle id="alert-dialog-title">
          {deleteBrand
            ? `Are you sure to delete this brand ${deleteBrand.name}?`
            : ""}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteBrand(null);
              setOpenConfirm(false);
            }}
            autoFocus
          >
            No
          </Button>
          <Button onClick={handleDeleteBrands}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllBrands;

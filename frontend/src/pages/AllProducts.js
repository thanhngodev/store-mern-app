import React, { useEffect, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import API from "../common";
import { toast } from "react-toastify";
import { MdModeEdit, MdDelete } from "react-icons/md";
import IMAGE_EMPTY from "../common/imageEmpty";
import CreateOrDetailProduct from "../components/CreateOrDetailProduct";
import formatCurrencyVND from "../helpers/formatCurrencyVND";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  border: "2px solid #fff",
  boxShadow: 24,
  bgcolor: "background.paper",
  p: 2,
  borderRadius: "16px",
  padding: "24px",
};

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const fetchAllProducts = async () => {
    const fetchData = await fetch(API.getProductAdmin.url, {
      method: API.getProductAdmin.method,
      credentials: "include",
    });
    const dataResponse = await fetchData.json();
    if (dataResponse.success) {
      setAllProducts(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleDeleteProducts = async () => {
    const fetchData = await fetch(
      API.deleteProduct.url + `/${deleteProduct._id}`,
      {
        method: API.deleteProduct.method,
        credentials: "include",
      }
    );

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      fetchAllProducts();
      setDeleteProduct(null);
      setOpenConfirm(false);
      toast.success(dataResponse.message);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  const handleChangeStatus = async (event, itemUPdate) => {
    const fetchData = await fetch(
      API.updateProduct.url + `/${itemUPdate._id}`,
      {
        method: API.updateProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...itemUPdate,
          brand: itemUPdate.brand ? itemUPdate.brand.code : null,
          status: event.target.checked,
        }),
      }
    );

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      fetchAllProducts();
      toast.success(dataResponse.message);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  return (
    <>
      <div className="mb-3 flex justify-between items-center">
        <div className=" font-bold text-xl">Products Management</div>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
          onClick={() => setOpenAddProduct(true)}
        >
          Add Product
        </button>
      </div>

      {allProducts ? (
        <>
          <div className="table-wrapper">
            <table className="fl-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Picture</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allProducts.length > 0 &&
                  allProducts.map((el, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{el.productName || ""}</td>
                        <td className="flex items-center justify-center">
                          <img
                            src={
                              el.productImage && el.productImage.length > 0
                                ? el.productImage[0]
                                : IMAGE_EMPTY
                            }
                            className="w-10 h-10 rounded-lg shadow-lg cover"
                            alt={"product image " + el.name}
                          />
                        </td>
                        <td>{el.brand && el.brand.name}</td>
                        <td>{formatCurrencyVND(el.price) || ""}</td>
                        <td>
                          <Switch
                            checked={el.status}
                            onChange={(event) => handleChangeStatus(event, el)}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        </td>
                        <td>
                          <button
                            className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white mr-2"
                            onClick={() => {
                              setProductDetails(el);
                              setOpenAddProduct(true);
                            }}
                          >
                            <MdModeEdit />
                          </button>
                          {el.brand && (
                            <button
                              className="bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white"
                              onClick={() => {
                                setDeleteProduct(el);
                                setOpenConfirm(true);
                              }}
                            >
                              <MdDelete />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div>Product Empty</div>
      )}

      <Modal
        open={openAddProduct}
        onClose={() => {
          setOpenAddProduct(false);
          setProductDetails(null);
        }}
      >
        <Box sx={style}>
          <CreateOrDetailProduct
            productDetails={productDetails}
            onClose={() => {
              setOpenAddProduct(false);
              setProductDetails(null);
            }}
            callFunc={fetchAllProducts}
          />
        </Box>
      </Modal>

      <Dialog
        open={openConfirm}
        onClose={() => {
          setDeleteProduct(null);
          setOpenConfirm(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ container: "dialog-custom-confirm" }}
      >
        <DialogTitle id="alert-dialog-title">
          {deleteProduct
            ? `Are you sure to delete this product ${deleteProduct.productName}?`
            : ""}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteProduct(null);
              setOpenConfirm(false);
            }}
            autoFocus
          >
            No
          </Button>
          <Button onClick={handleDeleteProducts}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllProducts;

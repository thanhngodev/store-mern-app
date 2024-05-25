import React, { useEffect, useRef, useState } from "react";
import API from "../common";
import { toast } from "react-toastify";
import Switch from "@mui/material/Switch";
import InputMask from "react-input-mask";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IMAGE_EMPTY from "../common/imageEmpty";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const CreateOrDetailProduct = ({
  productDetails = null,
  onClose,
  callFunc,
}) => {
  const [data, setData] = useState({
    productName: productDetails ? productDetails.productName : "",
    brand:
      productDetails && productDetails.brand
        ? productDetails.brand.code
        : "APPLE",
    productImage: productDetails ? productDetails.productImage : [],
    description: productDetails ? productDetails.description : "",
    price: productDetails ? productDetails.price : "",
    sellingPrice: productDetails ? productDetails.sellingPrice : "",
    status: productDetails ? productDetails.status : false,
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState({});
  const filePickerRef = useRef();
  const [listBrands, setListBrands] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files && files.length > 0) {
      setImageFiles(files);
    }
  };

  useEffect(() => {
    if (imageFiles && imageFiles.length > 0) {
      uploadImage();
    }
  }, [imageFiles]);

  const uploadImage = async () => {
    console.log(imageFiles);
    imageFiles.forEach((imageFile, index) => {
      const storage = getStorage(app);
      const filename = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      console.log(filename);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress((prevProgress) => ({
            ...prevProgress,
            [imageFile.name]: progress.toFixed(0),
          }));
        },
        (error) => {
          toast.error(`Could not upload image: ${imageFile.name}`);
          setImageFiles(null);
          setImageFileUploadProgress({});
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setTimeout(() => {
              setData((prevData) => ({
                ...prevData,
                productImage: [...prevData.productImage, downloadURL],
              }));
              if (index === imageFiles.length - 1) {
                setImageFiles(null);
              }
            }, 230);
            setTimeout(() => {
              setImageFileUploadProgress({});
            }, 1000);
          });
        }
      );
    });
  };

  const handleOnChange = (e, name) => {
    setData({
      ...data,
      [name]: name === "status" ? e.target.checked : e.target.value,
    });
  };

  const fetchAllBrands = async () => {
    const fetchData = await fetch(API.getBrand.url, {
      method: API.getBrand.method,
      credentials: "include",
    });
    const dataResponse = await fetchData.json();
    setListBrands(dataResponse.data);
  };

  const fetchUpdate = async () => {
    try {
      const response = await fetch(
        API.updateProduct.url + `/${productDetails._id}`,
        {
          method: API.updateProduct.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      return response.json();
    } catch (error) {
      console.error("Fetch Create Error:", error);
      throw error;
    }
  };

  const fetchCreate = async () => {
    try {
      const response = await fetch(API.createProduct.url, {
        method: API.createProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      return response.json();
    } catch (error) {
      console.error("Fetch Create Error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const dataResponse = productDetails
        ? await fetchUpdate()
        : await fetchCreate();

      if (dataResponse.success) {
        callFunc();
        if (!productDetails) {
          onClose();
        }
        toast.success(dataResponse.message);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllBrands();
  }, []);

  const handleRemoveImage = (index) => {
    const newProductImage = data.productImage.filter((_, i) => i !== index);
    setData((prevData) => ({
      ...prevData,
      productImage: newProductImage,
    }));
  };

  return (
    <div>
      <div className="font-bold text-xl">
        {productDetails ? "Edit/Details " : "Create "} Products
      </div>
      <form className="mt-2 flex flex-col gap-2" onSubmit={handleSubmit}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
              <div className="grid">
                <label>Product Name: </label>
                <div className="bg-slate-100 rounded-xl p-2">
                  <input
                    type="text"
                    placeholder="Enter product name"
                    name="productName"
                    value={data.productName}
                    onChange={(event) => handleOnChange(event, "productName")}
                    required
                    className="w-full h-full outline-none  bg-transparent"
                  />
                </div>
              </div>

              {listBrands && listBrands.length > 0 && (
                <div className="grid">
                  <label>Product Brand: </label>
                  <div className="bg-slate-100 rounded-xl p-2">
                    <select
                      className="w-full h-full outline-none  bg-transparent"
                      value={data.brand}
                      name="brand"
                      onChange={(event) => handleOnChange(event, "brand")}
                    >
                      {listBrands.map((el, index) => {
                        return (
                          <option value={el.code} key={index}>
                            {el.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              )}

              <div className="grid">
                <label>Price: </label>
                <div className="bg-slate-100 rounded-xl p-2">
                  <InputMask
                    mask="999999999999"
                    maskChar=""
                    value={data.price}
                    onChange={(event) => handleOnChange(event, "price")}
                    placeholder="Enter product price"
                    required
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="grid">
                <label>Selling Price: </label>
                <div className="bg-slate-100 rounded-xl p-2">
                  <InputMask
                    mask="999999999999"
                    maskChar=""
                    value={data.sellingPrice}
                    onChange={(event) => handleOnChange(event, "sellingPrice")}
                    placeholder="Enter product price"
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="grid">
                <label>Selling Price: </label>
                <div className="bg-slate-100 rounded-xl p-2">
                  <textarea
                    className="w-full h-full outline-none bg-transparent"
                    placeholder="enter product description"
                    rows={3}
                    onChange={(event) => handleOnChange(event, "description")}
                    name="description"
                    value={data.description}
                  ></textarea>
                </div>
              </div>

              <div className="grid w-full">
                <div className="flex items-center justify-center">
                  <div>Status: </div>
                  <Switch
                    checked={data.status}
                    onChange={(event) => handleOnChange(event, "status")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={8}>
              <div className="mb-2 flex justify-between items-center cursor-pointer">
                <div>Product Images</div>
                <div
                  className="flex items-center cursor-pointer border-1 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-xl "
                  onClick={() => filePickerRef.current.click()}
                >
                  <span>Upload Image</span>
                </div>
              </div>
              <div className="p-3 rounded-2xl shadow-full-37">
                <input
                  type="file"
                  accept="image/*"
                  multiple={true}
                  onChange={handleImageChange}
                  ref={filePickerRef}
                  hidden
                />
                <Box
                  sx={{
                    width: "100%",
                    height: 320,
                    overflowY: "scroll",
                    padding: "12px",
                  }}
                >
                  {data.productImage && data.productImage.length > 0 ? (
                    <>
                      <div className="row gx-4 gy-2">
                        {data.productImage.map((image, index) => (
                          <div className="mb-2 col-12 col-md-6 product-image">
                            <div className="flex">
                              <img
                                src={image}
                                alt={"Product Image " + index}
                                className="rounded-lg shadow-md cover"
                              />
                              <img
                                onClick={() => handleRemoveImage(index)}
                                className="product-image-icon h-5 w-5 shadow-xl "
                                src="https://firebasestorage.googleapis.com/v0/b/store-mern-app-249c2.appspot.com/o/cancel_circle_close_delete_discard_file_x_icon_123219.png?alt=media&token=0e85636f-fa10-4448-942e-7b264017b822"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      Product Image Is Empty
                      <img
                        src={IMAGE_EMPTY}
                        className="w-full h-full max-h-[250px] mt-2"
                      />
                    </div>
                  )}

                  {Object.keys(imageFileUploadProgress).map(
                    (fileName, index) => (
                      <div key={fileName}>
                        Upload Image {index}:{" "}
                        {imageFileUploadProgress[fileName]}%
                      </div>
                    )
                  )}
                </Box>
              </div>
            </Grid>
            <Grid item xs={16}>
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-xl hover:scale-110 transition-all mx-auto block mt-6">
                {productDetails ? "Update" : "Save"}
              </button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
};

export default CreateOrDetailProduct;

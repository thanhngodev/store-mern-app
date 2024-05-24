import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import API from "../common";
import { toast } from "react-toastify";

const CreateOrDetailBrand = ({ brandDetails = null, onClose, callFunc }) => {
  const [data, setData] = useState({
    code: brandDetails ? brandDetails.code : "",
    name: brandDetails ? brandDetails.name : "",
    status: brandDetails ? brandDetails.status : false,
  });

  const handleOnChange = (e, name) => {
    setData({
      ...data,
      [name]: name === "status" ? e.target.checked : e.target.value,
    });
  };

  const fetchUpdate = async () => {
    try {
      const response = await fetch(API.updateBrand.url + `/${brandDetails._id}`, {
        method: API.updateBrand.method,
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

  const fetchCreate = async () => {
    try {
      const response = await fetch(API.createBrand.url, {
        method: API.createBrand.method,
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

    try {
      const dataResponse = brandDetails ? await fetchUpdate() : await fetchCreate();

      if (dataResponse.success) {
        callFunc();
        if (!brandDetails) {
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

  return (
    <div>
      <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="grid">
          <label>Code: </label>
          <div className="bg-slate-100 rounded-xl p-2">
            <input
              type="text"
              placeholder="Enter your name"
              name="code"
              value={data.code}
              onChange={(event) => handleOnChange(event, "code")}
              required
              className="w-full h-full outline-none  bg-transparent"
            />
          </div>
        </div>

        <div className="grid">
          <label>name: </label>
          <div className="bg-slate-100 rounded-xl p-2">
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={data.name}
              onChange={(event) => handleOnChange(event, "name")}
              required
              className="w-full h-full outline-none  bg-transparent"
            />
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

        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-xl hover:scale-110 transition-all mx-auto block mt-6">
          {brandDetails ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default CreateOrDetailBrand;

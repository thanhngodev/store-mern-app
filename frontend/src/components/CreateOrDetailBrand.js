import React, { useState } from "react";

const CreateOrDetailBrand = ({ brandDetails = null, callFunc }) => {
  console.log({ brandDetails, callFunc });

  const [data, setData] = useState({
    code: brandDetails.code ? brandDetails.code : "",
    name: brandDetails.name ? brandDetails.name : "",
    status: brandDetails.status ? brandDetails.status : false,
  });

  const handleOnChange = () => {

  }

  const handleSubmit = () => {
    console.log();
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
              onChange={handleOnChange}
              required
              className="w-full h-full outline-none  bg-transparent"
            />
          </div>
        </div>


        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-xl hover:scale-110 transition-all mx-auto block mt-6">
            {brandDetails ? 'Update' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default CreateOrDetailBrand;

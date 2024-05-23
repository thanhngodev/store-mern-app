import React, { useState } from "react";

const AllProducts = () => {
  const [openAddProduct, setOpenAddProduct] = useState(false);

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
    </>
  );
};

export default AllProducts;

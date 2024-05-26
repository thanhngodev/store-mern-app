import React, { useEffect, useState } from "react";
import API from "../common";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import ProductCard from "../components/ProductCard";

const ProductList = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(`${API.getProducts.url}${query.search}`);
    const dataResponse = await response.json();
    setLoading(false);
    setData(dataResponse.data);
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <div className="container mx-auto py-1 px-4 mb-4">
      <p className="text-lg font-semibold my-3">
        Search Results : {data ? data.length : 0}
      </p>
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          {data && data.length > 0 ? (
            <div className="row gy-4" >
              {data.map((product, index) => (
                <div key={index} className="col-6 col-xs-4 col-lg-3 col-xxl-2 ">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <p className="bg-white text-lg text-center p-4">
              No Data Found....
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;

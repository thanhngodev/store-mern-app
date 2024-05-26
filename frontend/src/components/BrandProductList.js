import React, { useEffect, useState } from "react";
import API from "../common";
import CircularProgress from "@mui/material/CircularProgress";
import HorizontalCardProduct from "./HorizontalCardProduct";

const BrandProductList = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBrands = async () => {
    setLoading(true);
    const fetchData = await fetch(API.getBrand.url);
    const dataResponse = await fetchData.json();
    if (dataResponse.success) {
      setBrands(dataResponse.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          {brands &&
            brands.length > 0 &&
            brands.map((brand, index) => (
              <HorizontalCardProduct
                key={index}
                isBrand
                brand={brand.code}
                size={1000}
              />
            ))}
        </>
      )}
    </>
  );
};

export default BrandProductList;

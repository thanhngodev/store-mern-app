import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../common";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import ImageSlideProduct from "../components/ImageSlideProduct";
import formatCurrencyVND from "../helpers/formatCurrencyVND";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";

const ProductDetails = () => {
  const [data, setData] = useState(null);
  const params = useParams();

  const fetchProductDetails = async () => {
    const response = await fetch(`${API.getProductDetails.url}/${params?.id}`, {
      method: API.getProductDetails.method,
    });
    const responseData = await response.json();

    setData(responseData?.data);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  return (
    <div className="container mx-auto p-4">
      {data && (
        <>
          <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
            <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
              <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
                <ImageSlideProduct images={data.productImage} />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
                {data?.brandName}
              </p>
              <h2 className="text-2xl lg:text-4xl font-medium">
                {data?.productName}
              </h2>
              <p className="capitalize text-slate-400">{data?.category}</p>

              <div className="text-red-600 flex items-center gap-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>

              <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
                <p className="text-red-600">
                  {formatCurrencyVND(data.sellingPrice)}
                </p>
                <p className="text-slate-400 line-through">
                  {formatCurrencyVND(data.price)}
                </p>
              </div>

              <div className="flex items-center gap-3 my-2">
                <button className="border-2 border-red-600 rounded-lg px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white">
                  Buy
                </button>
                <button className="border-2 border-red-600 rounded-lg px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:bg-red-700">
                  Add To Cart
                </button>
              </div>

              <div>
                <p className="text-slate-600 font-medium my-1">
                  Description :{" "}
                </p>
                <p>{data?.description}</p>
              </div>
            </div>
          </div>
          <div>
            {data.brand && (
              <HorizontalCardProduct heading={"Recommended Product"} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;

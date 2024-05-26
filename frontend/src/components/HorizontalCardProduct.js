import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import API from "../common";

// Import Swiper styles
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "./ProductCard";

const HorizontalCardProduct = ({
  brand,
  size = 10,
  heading,
  isBrand = false,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    let queryParams = `size=${size}`;
    if (isBrand) {
      queryParams += `&brandCode=${brand}`;
    }
    const response = await fetch(`${API.getProducts.url}?${queryParams}`, {
      method: API.getProducts.method,
    });
    const products = await response.json();
    setLoading(false);
    setData(products?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4 text-center ">{heading}</h2>

      {loading ? (
        <div className="w-full flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={4}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            style={{
              "--swiper-navigation-color": "gray",
              "--swiper-navigation-size": "25px",
              "--swiper-pagination-color": "rgb(249 145 77)",
            }}
            navigation
            pagination={{ clickable: true }}
            className="card-product py-2 h-full"
          >
            {data &&
              data.length > 0 &&
              data.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
          </Swiper>

          <div className="flex w-full items-center justify-center">
            <Link
              to={"/product"}
              className="block w-fit no-underline hover:underline text-red-600"
            >
              Show More
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HorizontalCardProduct;

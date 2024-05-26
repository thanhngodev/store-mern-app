import React from "react";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BANNER_IMAGE from "../common/bannerData";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BannerProduct = () => {
  const desktopImages = BANNER_IMAGE;

  return (
    <div className="banner">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        style={{
          "--swiper-navigation-color": "rgb(249 145 77)",
          "--swiper-navigation-size": "40px",
          "--swiper-pagination-color": "rgb(249 145 77)",
        }}
        navigation
        pagination={{ clickable: true }}
        className="banner-swiper"
      >
        {desktopImages.map((imageURl, index) => (
          <SwiperSlide key={index}>
            <img src={imageURl} alt={`Banner ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerProduct;

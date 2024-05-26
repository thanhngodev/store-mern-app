import React, { useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ImageSlideProduct = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="h-full" >
      <Swiper
        style={{
          "--swiper-navigation-color": "gray",
          "--swiper-navigation-size": "25px",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="image-slide-product"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="cursor-pointer">
            <img src={image} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="image-slide-product-list"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="cursor-pointer">
            <img src={image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlideProduct;

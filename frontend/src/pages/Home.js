import React from "react";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";

const Home = () => {
  return (
    <>
      <BannerProduct />
      <HorizontalCardProduct brand={'APPLE'} isBrand size={4} heading={"Outstanding products of the Apple brand"} />
      <HorizontalCardProduct brand={'SAMSUNG'} isBrand size={4} heading={"Outstanding products of the Samsung brand"} />
    </>
  );
};

export default Home;

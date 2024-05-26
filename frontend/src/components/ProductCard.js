import { CardActionArea, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import formatCurrencyVND from "../helpers/formatCurrencyVND";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const goProductDetails = (id) => {
    navigate("/product/" + id);
  };

  return (
    <div
      onClick={() => goProductDetails(product._id)}
      className="cursor-pointer flex items-center justify-center"
    >
      <Card
        sx={{
          maxWidth: 400,
          borderRadius: "12px",
          paddingBottom: "12px",
        }}
        className="product-card"
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="100"
            image={product.productImage[0]}
            alt="product image"
          />
          <CardContent>
            <p className="text-md line-clamp-1">{product?.productName}</p>
            <p className="text-red-600 font-medium">
              {formatCurrencyVND(product?.sellingPrice)}
            </p>
            <p className="text-slate-500 line-through">
              {formatCurrencyVND(product?.price)}
            </p>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <div className="pb-1 flex justify-center w-100">
            <button className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md flex items-center justify-center">
              <svg
                fill="none"
                height="18"
                viewBox="0 0 30 27"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
              >
                <path
                  d="M1.39999 1.70001H6.60001"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
                <path
                  d="M6.60001 1.70001L11 18.9"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
                <path
                  d="M11.8 18.9H28.3"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
                <path
                  d="M13.8 25.7C15.4569 25.7 16.8 24.3569 16.8 22.7C16.8 21.0432 15.4569 19.7 13.8 19.7C12.1431 19.7 10.8 21.0432 10.8 22.7C10.8 24.3569 12.1431 25.7 13.8 25.7Z"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
                <path
                  d="M25.3 25.7C26.9568 25.7 28.3 24.3569 28.3 22.7C28.3 21.0432 26.9568 19.7 25.3 19.7C23.6431 19.7 22.3 21.0432 22.3 22.7C22.3 24.3569 23.6431 25.7 25.3 25.7Z"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
                <path
                  d="M25.7 14.6H11.3C10.7 14.6 10.1 14.2 10 13.6L8.1 6.90001C7.9 6.00001 8.49999 5.20001 9.39999 5.20001H27.5C28.4 5.20001 29.1 6.10001 28.8 6.90001L26.9 13.6C26.9 14.2 26.4 14.6 25.7 14.6Z"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
              </svg>
              Add to Cart
            </button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default ProductCard;

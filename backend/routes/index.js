const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/user/userSignup");
const userSignInController = require("../controller/user/userSignin");
const userSignInGoogleController = require("../controller/user/userSigninGoogle");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const userListController = require("../controller/user/userList");
const userUpdateController = require("../controller/user/userUpdate");
const userDeleteController = require("../controller/user/userDelete");
const brandCreateController = require("../controller/brand/createBrand");
const brandUpdateController = require("../controller/brand/updateBrand");
const brandDetailsController = require("../controller/brand/getDetailsBrand");
const brandListController = require("../controller/brand/getListBrand");
const brandDeleteController = require("../controller/brand/deleteBrand");
const productCreateController = require("../controller/product/createProduct");
const productUpdateController = require("../controller/product/updateProduct");
const deleteProductController = require("../controller/product/deleteProduct");
const productAllController = require("../controller/product/getAllProducts");
const productDetailsController = require("../controller/product/getProductDetails");
const brandListUserController = require("../controller/brand/getUserListBrand");
const productAllUserController = require("../controller/product/getAllProductUser");
const getProductListController = require("../controller/product/getProductList");
const userProfileController = require("../controller/user/userProfile");

//#region user
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.post("/google", userSignInGoogleController);
router.get("/user-details", authToken, userDetailsController);
router.get("/profile", authToken, userProfileController);
router.get("/userLogout", userLogout);
//#endregion user


//#region brand
router.get("/admin/brand", authToken, brandListController);
router.get("/brand", brandListUserController);
router.get("/brand/:id", authToken, brandDetailsController);
router.post("/admin/brand/create", authToken, brandCreateController);
router.put("/admin/brand/update/:id", authToken, brandUpdateController);
router.delete("/admin/brand/:id", authToken, brandDeleteController);
//#endregion brand

//#region product
router.get("/admin/product", authToken, productAllController);
router.get("/product", authToken, productAllUserController);
router.get("/products", getProductListController);
router.get("/product/:productId", productDetailsController);
router.post("/admin/product/create", authToken, productCreateController);
router.put("/admin/product/update/:productId", authToken, productUpdateController);
router.delete("/admin/product/:productId", authToken, deleteProductController);
//#endregion product

//#region admin panel 
// user
router.get("/all-user", authToken, userListController);
router.put("/update-user/:userId", authToken, userUpdateController);
router.delete("/delete-user/:userId", authToken, userDeleteController);
//#endregion admin panel 

module.exports = router;

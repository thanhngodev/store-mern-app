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

//#region user
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.post("/google", userSignInGoogleController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);
//#endregion user


//#region brand
router.get("/brand", authToken, brandListController);
router.get("/brand/:id", authToken, brandDetailsController);
router.post("/brand/create", authToken, brandCreateController);
router.put("/brand/update/:id", authToken, brandUpdateController);
router.delete("/brand/:id", authToken, brandDeleteController);
//#endregion brand


//#region admin panel 
// user
router.get("/all-user", authToken, userListController);
router.post("/update-user", authToken, userUpdateController);
router.delete("/delete-user/:userId", authToken, userDeleteController);
//#endregion admin panel 

module.exports = router;

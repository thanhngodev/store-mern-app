const express = require("express");

const router = express.Router();

// import controller
const userSignUpController = require("../controller/user/userSignup");
const userSignInController = require("../controller/user/userSignin");
const userSignInGoogleController = require("../controller/user/userSigninGoogle");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const userListController = require("../controller/user/userList");
const userUpdateController = require("../controller/user/userUpdate");
const userDeleteController = require("../controller/user/userDelete");

// use controller
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.post("/google", userSignInGoogleController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

//admin panel
router.get("/all-user", authToken, userListController);
router.post("/update-user", authToken, userUpdateController);
router.delete("/delete-user/:userId", authToken, userDeleteController);

module.exports = router;

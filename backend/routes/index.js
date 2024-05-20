const express = require("express");

const router = express.Router();

// import controller
const userSignUpController = require("../controller/user/userSignup");
const userSignInController = require("../controller/user/userSignin");
const userSignInGoogleController = require("../controller/user/userSigninGoogle");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");

// use controller
router.post('/signup', userSignUpController);
router.post('/signin', userSignInController);
router.post('/google', userSignInGoogleController);
router.get('/user-details', authToken, userDetailsController);
router.get("/userLogout", userLogout);

module.exports = router;

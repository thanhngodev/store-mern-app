const express = require("express");

const router = express.Router();

// import controller
const userSignUpController = require("../controller/user/userSignup");
const userSignInController = require("../controller/user/userSignin");
const userSignInGoogleController = require("../controller/user/userSigninGoogle");

// use controller
router.post('/signup', userSignInController);
router.post('/signin', userSignInController);
router.post('/google', userSignInGoogleController);


module.exports = router;

const express = require("express");

const router = express.Router();

// import controller
const userSignUpController = require("../controller/user/userSignup");
const userSignInController = require("../controller/user/userSignin");

// use controller
router.post('/signup', userSignUpController);
router.post('/signin', userSignInController);


module.exports = router;

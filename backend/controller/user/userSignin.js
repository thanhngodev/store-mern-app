const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            throw new Error("Please enter email and password");
        }

        const user = await userModel.findOne({ email });

        if(!user) {
            throw new Error("User not found");
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword) {
            throw new Error("Sign in failed, re-check email and password");
        }
        const { token, tokenOption } = genToken(user);
        res.cookie("token", token, tokenOption).status(200).json({
            message: "Login successfully",
            data: token,
            success: true,
            error: false
        })

    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = userSignInController;
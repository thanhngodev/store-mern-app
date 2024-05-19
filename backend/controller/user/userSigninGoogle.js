const genToken = require("../../helpers/genToken");
const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignInGoogleController(req, res) {
    const { email, name, photoURL } = req.body;
    try {
        const user = await userModel.findOne({email});
        if(user) {
            // signin 
            const { token, tokenOption } = genToken(user);
            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login with google successfully",
                data: token,
                success: true,
                error: false
            })
        } else {
            // signup
            const genergatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashPassword = bcrypt.hashSync(genergatedPassword, 10);
            const newUser = new userModel({
                name,
                email,
                password: hashPassword,
                profilePic: photoURL,
                role: 'GENERAL'
            })

            await newUser.save();
            const { token, tokenOption } = genToken(newUser);
            res.cookie("token", token, tokenOption).status(200).json({
                message: "Sign up and Sign in with google successfully",
                data: token,
                success: true,
                error: false
            })
        }
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = userSignInGoogleController;
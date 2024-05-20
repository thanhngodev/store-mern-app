const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

const ImageDefault = "https://firebasestorage.googleapis.com/v0/b/store-mern-app-249c2.appspot.com/o/1716221842924user.webp?alt=media&token=da27ccbd-266d-438f-a6e5-3e9eb62911f6";


async function userSignUpController(req, res) {
    try {
        const { email, password, name, profilePic } = req.body;
        const user = await userModel.findOne({ email });
        
        if(user) {
            throw new Error("Already user exists");
        }

        if(!email) {
            throw new Error("Please enter a valid email");
        }

        if(!password) {
            throw new Error("Please enter a valid password");
        }

        if(!name) {
            throw new Error("Please enter a valid name");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword) {
            throw new Error("Something went wrong");
        }

        const payload = {
            ...req.body,
            role: 'GENERAL',
            password: hashPassword,
            profilePic: profilePic ? profilePic : ImageDefault
        }

        const useData = new userModel(payload);
        const saveUser = await useData.save();

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully!!!"
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = userSignUpController;
const userModel = require("../models/userModel");

const uploadProductPermission = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    console.log(user);
    if (!user) {
      return false;
    }
    if (user.role === "ADMIN") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error while checking permission:", error);
    return false;
  }
};

module.exports = uploadProductPermission;

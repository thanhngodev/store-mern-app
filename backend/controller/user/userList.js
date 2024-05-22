const userModel = require("../../models/userModel");

async function userListController(req, res) {
  try {
    const allUsers = await userModel.find();
    const filteredUsers = allUsers.filter(user => user.id !== req.userId);

    res.json({
      message: "All User ",
      data: filteredUsers,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userListController;

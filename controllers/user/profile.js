// controllers/user/profile.js

const models = require("../../models");

async function profile(req, res) {
  try {
    const { userId } = req.user;

    const user = await models.users.findOne({
      where: {
        id: userId,
      },
      attributes: ["id", "userName", "email", "role"],
    });

    if (!user) {
      return res.status(404).json({
        hasError: true,
        message: "User not found",
      });
    }

    const formattedUser = {
      id: user.id,
      userName: user.userName,
      role: user.role,
      email: user.email,
    };

    return res.status(200).json({
      hasError: false,
      data: formattedUser,
      message: "User profile fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching User profile:", error);

    return res.status(500).json({
      hasError: true,
      message: "Internal server error",
      error: error.message,
    });
  }
}

module.exports = profile;

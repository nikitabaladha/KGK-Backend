const models = require("../../models");
const crypto = require("crypto");

async function forgotPassword(email) {
  try {
    const { userId } = req.user;

    const { email } = req.body;
    console.log("User", email);
    const user = await models.users.findOne({ where: { email } });

    if (!user) {
      return {
        hasError: true,
        message: "Sorry, this user does not exist!",
      };
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const resetTokenExpires = Date.now() + 3600000;

    await models.users.update(
      { resetToken, resetTokenExpires },
      { where: { id: userId } }
    );

    return resetToken;
  } catch (error) {
    console.error("Error generating reset token:", error);
    return {
      hasError: true,
      message: "Internal server error",
      error: error.message,
    };
  }
}

module.exports = forgotPassword;

// controllers/resetPassword.js

const models = require("../../models");
const { hashPassword } = require("../../validator/saltFunction");

async function resetPassword(token, newPassword) {
  const user = await models.users.findOne({
    where: {
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    },
  });

  if (!user) {
    return res.status(404).json({
      hasError: true,
      message: "Invalid or expired reset token",
    });
  }

  const { hashedPassword, salt } = hashPassword(newPassword);

  await models.users.update(
    {
      password: hashedPassword,
      salt,
      resetToken: null,
      resetTokenExpires: null,
    },
    { where: { id: user.id } }
  );

  return "Password reset successfully";
}

module.exports = resetPassword;

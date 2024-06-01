//controllers/user/register.js

const models = require("../../models");
const saltFunction = require("../../validator/saltFunction.js");
const validateRegistrationData = require("../../validator/validateRegistrationData");

async function register(req, res) {
  try {
    const { userName, email, password, role } = req.body;

    const validationErrors = validateRegistrationData({
      userName,
      email,
      password,
    });

    if (validationErrors.length > 0) {
      return res.status(400).json({ message: validationErrors.join(", ") });
    }

    const existingUser = await models.users.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        hasError: true,
        message: "User with this email already exists",
      });
    }

    const { hashedPassword, salt } = saltFunction.hashPassword(password);

    const newUser = await models.users.create({
      userName,
      email,
      password: hashedPassword,
      role,
      salt,
    });

    const sanitizedUser = {
      id: newUser.id,
      userName: newUser.userName,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    return res.status(200).json({
      hasError: false,
      message: "Registration successful",
      data: sanitizedUser,
    });
  } catch (error) {
    console.error("Error during Registration:", error);

    return res.status(500).json({
      hasError: true,
      message: "Internal server error",
      error: error.message,
    });
  }
}

module.exports = register;

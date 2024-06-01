// controllers/user/login.js

const jwt = require("jsonwebtoken");
const models = require("../../models");
const saltFunction = require("../../validator/saltFunction");
const { jwtSecret, jwtExpiration } = require("../../config/config.json");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await models.users.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        hasError: true,
        message: "Sorry, this user does not exist!",
      });
    }

    const isPasswordValid = await saltFunction.validatePassword(
      password,
      user.password,
      user.salt
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        hasError: true,
        message: "Invalid password",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        userName: user.userName,
        role: user.role,
      },
      jwtSecret,
      {
        expiresIn: jwtExpiration,
      }
    );

    return res.status(200).json({
      accessToken,
      hasError: false,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error during login:", error);

    return res.status(500).json({
      hasError: true,
      message: "Internal server error",
      error: error.message,
    });
  }
}

module.exports = login;

// middleware/index.js

const jwt = require("jsonwebtoken");
const config = require("../config/config.json");

async function middleware(req, res, next) {
  const accessToken = req.headers.access_token;

  if (!accessToken) {
    return res.status(401).json({
      hasError: true,
      error: "Unauthorized",
      message: "Please provide a valid access token",
    });
  }

  try {
    const userDetails = jwt.verify(accessToken, config.jwtSecret);

    if (!userDetails) {
      return res.status(401).json({
        hasError: true,
        error: "Bad Request",
        message: "Access token expired or invalid",
      });
    }

    console.log(userDetails);

    req.user = userDetails;

    next();
  } catch (error) {
    console.error("Error decrypting access token:", error);

    return res.status(500).json({
      hasError: true,
      error: "Internal Server Error",
      message: "Failed to process access token",
    });
  }
}

module.exports = middleware;

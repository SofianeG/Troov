const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const userController = require("../controllers/userController");
dotenv.config({
  path: "./config/config.env",
});

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/uploadCoverPhoto", userController.uploadCoverPhoto);

module.exports = router;

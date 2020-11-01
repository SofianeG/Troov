const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const movieController = require("../controllers/movieController");
dotenv.config({
  path: "./config/config.env",
});

router.post("/createmovie", movieController.createMovie);
router.get("/getmovie", movieController.getMovie);
router.post("/edit/:movieID", movieController.updateMovie);
router.delete("/:movieID", movieController.deleteMovie);

module.exports = router;

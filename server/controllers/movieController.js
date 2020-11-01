const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Movie = require("../model/MovieSchema");

exports.createMovie = async (req, res) => {
  const { title, description, moviePicture } = req.body;
  const movie = new Movie({
    title,
    description,
    moviePicture,
  });

  await movie.save().then((movie) =>
    res.status(200).json({
      message: "movie created",
      movie,
    })
  );
};

exports.getMovie = async (req, res) => {
  Movie.find().then((movie) =>
    res.status(200).json({
      movie,
    })
  );
};

exports.updateMovie = (req, res) => {
  const { title, description, moviePicture, year } = req.body;
  const updateMovie = Movie.updateOne(
    { _id: req.params.movieID },
    { $set: { title, description, moviePicture, year } }
  );
  updateMovie
    .exec()
    .then((data) => {
      console.log("success on update chat - server");
      res.json(data);
    })
    .catch((error) => {
      console.log("error on update chat - server");
      res.json(error);
    });
};

exports.deleteMovie = async (req, res) => {
  Movie.findOneAndDelete({ _id: req.params.movieID }, function (err) {
    if (!err) {
      return res.status(200).json({
        message: "movie deleted",
      });
    } else {
      return res.status(400).json({
        message: "error on deleted movie",
      });
    }
  });
};

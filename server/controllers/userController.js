const dotenv = require("dotenv");
const User = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();
var multer = require("multer");

dotenv.config({
  path: "./config/config.env",
});

app.use(cors());
app.use(bodyParser.json()); // pour les requetes json. req.body
app.use(express.json());

const { JWT_SECRET_KEY } = process.env;

exports.register = async (req, res) => {
  const { email, password, firstName, lastName, female } = req.body;
  try {
    if (!email || !password || !firstName || !lastName || !female) {
      console.log("you have to fill all input");
    }
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email))
      throw "Email is not supported from your domain.";
    if (password.length < 6)
      throw "Password must be atleast 6 characters long.";

    User.findOne({ email: email }, (error, user) => {
      if (user == null) {
        bcrypt.hash(password, 10, (error, hash) => {
          User.create(
            {
              email,
              password: hash,
              firstName,
              lastName,
              female,
            },
            (err, userData) => {
              res.status(200).json({
                status: "success",
                message: "inscription reussis",
                userData,
              });
            }
          );
        });
      } else {
        res.status(400).json({
          error: "email or username already exist",
        });
      }
    });
  } catch (err) {
    console.log(err, "error on register on user controller");
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404).json({
      message: "you have to fill all field",
    });
  }
  User.findOne({ email: email })
    //.select("-password") // on supprime le password des resultat pour que personne le voit.
    .then((savedUser) => {
      if (savedUser) {
        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET_KEY);
        let { name, email, _id, firstName } = savedUser;
        res.status(200).json({ firstName, email, token, _id });
        bcrypt.compare(password, savedUser.password).then((goodPassword) => {
          if (goodPassword) {
            res.status(200).json({
              message: "you are the good user you can connect",
            });
          } else {
            res.status(404).json({
              message: " wrong name or password",
            });
          }
        });
      } else {
        res.status(404).json({
          message: "login erreur",
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: "erreur",
      });
    });
};

/////////////// UPLOAD COVER PHOTO  ///////////////////////////

app.use(bodyParser.urlencoded({ extended: true }));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now() + "-" + file.originalname);
  },
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4" || ext !== ".jpg") {
      return cb(
        res.status(400).end("only mp4 file or jpg file are allowed"),
        false
      );
      cb(null, true);
    }
  },
});

var upload = multer({
  storage: storage,
  // limits: { fieldSize: 25 * 1024 * 1024 },
}).single("file");

exports.uploadCoverPhoto = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: "false",
      });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
};

////////////////////////////////////////////////////////////////

exports.logOut = async (req, res) => {};

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./route/userRoute");
const movieRoute = require("./route/movieRoute");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

dotenv.config({
  path: "./config/config.env",
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static("uploads"));

const CONNECTION_URL =
  "mongodb+srv://SGS:Eminem17@cluster0.wnffw.azure.mongodb.net/<dbname>?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);

///////////////////////    ROUTE    ///////////////////////////////////
app.use("/user", userRoute);
app.use("/movie", movieRoute);

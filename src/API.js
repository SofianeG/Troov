import axios from "axios";

export const registerApi = (
  email,
  password,
  firstName,
  lastName,
  female,
  callback
) => {
  axios({
    method: "POST",
    url: "http://localhost:5000/user/register",
    data: { email, password, firstName, lastName, female },
  })
    .then((res) => {
      localStorage.setItem("userId", res?.data?.userData?._id);
      callback();
    })
    .catch((err) => {
      console.log(err, "error on register");
    });
};

export const loginApi = (email, password, callback) => {
  axios({
    method: "POST",
    url: "http://localhost:5000/user/login",
    data: { email, password },
  })
    .then((res) => {
      console.log(res, "---res login api----");
      callback();
    })
    .catch((err) => {
      console.log(err, "error on loginAPi");
    });
};

export const deleteMovieApi = (movieID) => {
  axios({
    method: "DELETE",
    url: `http://localhost:5000/movie/${movieID}`,
  })
    .then((res) => {
      console.log(res, "---res login api----");
    })
    .catch((err) => {
      console.log(err, "error on loginAPi");
    });
};

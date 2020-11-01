import React, { useState, useEffect } from "react";
import "./Home.css";
import CardMovie from "../../component/cardMovie/CardMovie";
import axios from "axios";
import { deleteMovieApi } from "../../API";

export default function Home({ history }) {
  const [movie, setMovie] = useState([]);
  const [search, setSearch] = useState("");

  const getMovie = () => {
    axios({
      method: "GET",
      url: "http://localhost:5000/movie/getmovie",
    })
      .then((res) => {
        setMovie(res.data.movie);
        console.log(res.data.movie, "result get movie ");
      })
      .catch((err) => {
        console.log(err, "error onget movie");
      });
  };

  useEffect(() => {
    getMovie();
  }, []);

  const handleUpdateMovie = (id, title, description, picture) => {
    history.push({
      pathname: `/editmovie/${id}`,
      state: { id, title, description, picture },
    });
  };
  const handleDeleteMovie = (filmId) => {
    deleteMovieApi(filmId);
    return getMovie();
  };

  const allMovie = () => {
    return movie
      ?.filter((e) => {
        if (search === "") {
          return e;
        } else if (e.title === search) {
          return e.title == search;
        }
      })
      .map((film, index) => {
        return (
          <CardMovie
            key={index}
            id={film?._id}
            title={film?.title}
            description={film?.description}
            image={film?.moviePicture}
            updateMovieProps={(filmId) =>
              handleUpdateMovie(
                film?._id,
                film?.title,
                film?.description,
                film?.moviePicture
              )
            }
            deleteMovieProps={(filmId) => handleDeleteMovie(filmId)}
          />
        );
      });
  };

  return (
    <>
      <input
        type="text"
        placeholder="search movie"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => history.push("/addmovie")}>create movie</button>
      <div className="container_home">{allMovie()}</div>
    </>
  );
}

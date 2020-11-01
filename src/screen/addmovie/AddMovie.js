import React, { useState } from "react";
import "./AddMovie.css";
import axios from "axios";
import { uploadCoverPhotoApi } from "../../API";
import Dropzone from "react-dropzone";

export default function AddMovie({ history }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [filePath, setFilePath] = useState("");

  const onDrop = async (files) => {
    console.log(files, "files upload");

    let formData = new FormData();
    console.log(files[0], "files 0");
    formData.append("file", files[0]);

    await axios({
      method: "post",
      url: "http://localhost:5000/user/uploadCoverPhoto",
      headers: { "content-type": "multipart/form-data" },
      data: formData,
    }).then((response) => {
      if (response.data.success) {
        const newFilePath = response.data.filePath.replace("uploads/", "");
        const newFilePath2 = `http://localhost:5000/static/${newFilePath}`;
        setFilePath(newFilePath2);
      }
    });
  };

  const handleCreateMovie = () => {
    console.log("handle");
    axios({
      method: "post",
      url: "http://localhost:5000/movie/createmovie",
      data: { title, description, moviePicture: filePath, year },
    })
      .then((response) => {
        console.log(response, "response create movie");
        return history.push("/");
      })
      .catch((err) => console.log(err, "error on create movie"));
  };

  return (
    <div className="container_addmovie">
      <label>title</label>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>description</label>
      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <p>picture of movie</p>
      <Dropzone onDrop={(files) => onDrop(files)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      <label>Release date</label>
      <input
        style={{ marginBottom: 100 }}
        type="text"
        placeholder="year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button onClick={() => handleCreateMovie()}>create movie</button>
    </div>
  );
}

// modificayion suppression

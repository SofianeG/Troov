import React, { useState, useEffect } from "react";
import "./EditMovie.css";
import axios from "axios";
import { uploadCoverPhotoApi } from "../../API";
import Dropzone from "react-dropzone";

export default function EditMovie({ history, location, match, params }) {
  const [title, setTitle] = useState(location?.state?.title);
  const [description, setDescription] = useState(location?.state?.description);
  const [year, setYear] = useState(location?.state?.year);
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

  const handleEditMovie = async () => {
    await axios({
      method: "post",
      url: `http://localhost:5000/movie/edit/${match?.params?.id}`,
      data: { title, description, year, moviePicture: filePath },
    }).then((response) => {
      console.log(response, "response");
      history.push("/");
    });
  };

  useEffect(() => {
    console.log(location, "location");
    console.log(match, "match");
    console.log(params, "params");
  }, []);

  return (
    <div className="container_addmovie">
      <p>picture : </p>
      <img src={location.state.picture} style={{ width: 100, height: 100 }} />
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
      <button onClick={() => handleEditMovie()}>edit movie</button>
    </div>
  );
}

// modificayion suppression

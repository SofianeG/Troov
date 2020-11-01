import React, { useState } from "react";
import useStyles from "./style";
import axios from "axios";
import { uploadCoverPhotoApi } from "../../API";
import Dropzone from "react-dropzone";
import { TextField, Button, Typography, Paper } from "@material-ui/core";

export default function AddMovie({ history }) {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [filePath, setFilePath] = useState("");

  const onDrop = async (files) => {
    let formData = new FormData();
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
    <div>
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleCreateMovie}
        >
          <Typography>CREATION FILM</Typography>
          <TextField
            name="title"
            variant="outlined"
            label="title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            name="description"
            variant="outlined"
            label="Title"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            name="realease date"
            variant="outlined"
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <div className={classes.fileInput}>
            <Dropzone onDrop={(files) => onDrop(files)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Button size="small" color="primary">
                      click to select files
                    </Button>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            onClick={() => handleCreateMovie()}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </div>
  );
}

// modification suppression

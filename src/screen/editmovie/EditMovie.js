import React, { useState, useEffect } from "react";
import useStyles from "./style";
import axios from "axios";
import { uploadCoverPhotoApi } from "../../API";
import Dropzone from "react-dropzone";
import { TextField, Button, Typography, Paper } from "@material-ui/core";

export default function EditMovie({ history, location, match, params }) {
  const [title, setTitle] = useState(location?.state?.title);
  const [description, setDescription] = useState(location?.state?.description);
  const [year, setYear] = useState(location?.state?.year);
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

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleEditMovie}
      >
        <Typography>MODIFIER FILM</Typography>
        <TextField
          name="titre"
          variant="outlined"
          label="titre"
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
        <Dropzone onDrop={(files) => onDrop(files)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p> click to Modify files</p>
              </div>
            </section>
          )}
        </Dropzone>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          onClick={() => handleEditMovie()}
        >
          MODIFIER
        </Button>
      </form>
    </Paper>
  );
}

// modificayion suppression

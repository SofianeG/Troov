import React, { useState } from "react";
import Header from "../../component/header/Header";
import "./style.js";
import BtnLogin from "../../component/btnLogin/BtnLogin";
import BtnNext from "../../component/btn/BtnNext";
import { loginApi } from "../../API";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./style";

export default function Login({ history }) {
  const classes = useStyles();

  // STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    loginApi(email, password, () => {
      return history.push("/");
    });
  };
  return (
    <div>
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleLogin}
        >
          <Typography> SE CONNECTER</Typography>
          <TextField
            name="Votre adresse email"
            variant="outlined"
            label="EMAIL"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            name="description"
            variant="outlined"
            label="PASSWORD"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            onClick={() => handleLogin()}
          >
            CONTINUER
          </Button>
        </form>
        <p className="register_login">
          <a href="/register">M'inscrire</a>
        </p>
      </Paper>
    </div>
  );
}

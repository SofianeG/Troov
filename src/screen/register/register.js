import React, { useState } from "react";
import Header from "../../component/header/Header";
import "./style.js";
import BtnFinish from "../../component/btn/BtnFinish";
import { registerApi } from "../../API";
import useStyles from "./style";
import { TextField, Button, Typography, Paper } from "@material-ui/core";

export default function Register({ history }) {
  const classes = useStyles();

  // STATE
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [female, setFemale] = useState(false);

  const handleRegister = () => {
    registerApi(email, password, firstName, lastName, female, () => {
      return history.push("/");
    });
  };
  return (
    <>
      <Header />
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleRegister}
        >
          <Typography> CREER UN COMPTE </Typography>
          <TextField
            name="Prenom"
            variant="outlined"
            label="Prenom"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            name="Nom"
            variant="outlined"
            label="Nom"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            name="email"
            variant="outlined"
            label="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            name="Mot de Passe"
            variant="outlined"
            label="Mot de Passe"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            name="Confirmer Mot de Passe"
            variant="outlined"
            label="Confirmer Mot de Passe"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p className="text_you_are_register">Vous êtes</p>
          <select
            className="input_register"
            style={{ marginBottom: 37 }}
            onChange={(e) => {
              e.target.value === "femme" ? setFemale(true) : setFemale(false);
            }}
          >
            <option value="homme">un Homme</option>
            <option value="femme">une Femme</option>
          </select>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            onClick={() => handleRegister()}
          >
            S'inscrire
          </Button>
        </form>
      </Paper>
    </>
  );
}

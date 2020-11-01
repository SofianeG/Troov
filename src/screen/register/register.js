import React, { useState } from "react";
import Header from "../../component/header/Header";
import "./Register.css";
import BtnFinish from "../../component/btn/BtnFinish";
import { registerApi } from "../../API";

export default function Register({ history }) {
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
      <div className="container_register">
        {console.log(female, "------female-----")}
        <div className="wrapper_register">
          <p className="text_create_account_register">Créez un compte</p>
          <div className="circle_icon_profile_register"></div>
          <p className="text_add_picture_register">Ajouter une photo</p>
          <input
            className="input_register"
            type="text"
            placeholder="Prénom"
            style={{ marginBottom: 16 }}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="input_register"
            type="text"
            placeholder="Nom"
            style={{ marginBottom: 16 }}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            className="input_register"
            type="text"
            placeholder="Email"
            style={{ marginBottom: 16 }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input_register"
            type="text"
            placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text_atleast8_register">
            Il doit contenir au moins 8 caractères.{" "}
          </p>
          <input
            className="input_register"
            type="text"
            placeholder="Mot de passe"
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
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
          </select>
          <BtnFinish title="Terminer" onClick={() => handleRegister()} />
        </div>
      </div>
    </>
  );
}

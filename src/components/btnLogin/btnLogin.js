import React from "react";
import "./BtnLogin.css";

export default function BtnLogin({ title }) {
  return title === "Login avec Google" ? (
    <div className="wrapper_google_btnlogin"></div>
  ) : (
    <div className="wrapper_facebook_btnlogin"></div>
  );
}

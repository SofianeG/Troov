import React, { useState, useEffect } from "react";
import "./Header.css";

export default function Header() {
  //STATE
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    (async () => {
      let userId = localStorage.getItem("userId");
      let userName = localStorage.getItem("userName");
      setUserId(userId);
      setUserName(userName);
      console.log(userName, "user name header");
    })();
  }, []);

  return (
    <div className="container_header">
      <div className="header_left_header">
        <div className="wrapper_input_header">
          <input
            type="text"
            className="input_search_word_header"
            placeholder="Rechercher des mots clés"
          />
        </div>

        <div className="add_product_header">
          <p className="text_add_product_header">Déposer une annonce</p>
        </div>
      </div>
      <ul className="wrapper_link_header">
        <li>
          <a href="">Association</a>
        </li>
        <li>
          <a href="">Favoris</a>
        </li>
        <li>
          <a href="">Messages</a>
        </li>
        <li>
          {userId ? (
            <a
              style={{
                cursor: " pointer",
              }}
              onClick={() => localStorage.clear()}
            >
              <span
                style={{
                  marginRight: 10,
                  fontSize: 11,
                  position: "relative",
                  top: 2,
                }}
              ></span>
              {userName}
            </a>
          ) : (
            <a href="/login">Se connecter</a>
          )}
        </li>
      </ul>
    </div>
  );
}

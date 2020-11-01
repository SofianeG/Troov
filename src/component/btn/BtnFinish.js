import React from "react";
import "./BtnFinish.css";

export default function BtnFinish({ title, onClick }) {
  return (
    <div className="container_btnfinish" onClick={onClick}>
      <p className="text_btnfinish">{title}</p>
    </div>
  );
}

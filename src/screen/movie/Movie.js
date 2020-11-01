import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Movie() {
  let { id } = useParams();

  useEffect(() => {
    console.log(id, "-----id-------");
  });
  return <div>movie</div>;
}

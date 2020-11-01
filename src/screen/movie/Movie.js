import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Movie() {
  let { id } = useParams();

  useEffect(() => {});
  return <div>movie</div>;
}

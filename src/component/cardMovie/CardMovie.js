import React from "react";
import { Card, Button } from "react-bootstrap";
import "./CardMovie.css";

export default function CardMovie({
  title,
  description,
  image,
  id,
  deleteMovieProps,
  updateMovieProps,
}) {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Button href={`/movie/${id}`} variant="primary">
            details de {title}
          </Button>
          <button
            onClick={() => deleteMovieProps(id)}
            style={{ backgroundColor: "red", color: "white", marginLeft: 10 }}
          >
            DELETE
          </button>
          <button
            onClick={() => updateMovieProps(id)}
            style={{ backgroundColor: "white", color: "red", marginLeft: 10 }}
          >
            UPDATE
          </button>
        </Card.Body>
      </Card>
    </>
  );
}

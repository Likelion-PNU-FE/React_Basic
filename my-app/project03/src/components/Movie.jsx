import {useEffect, useState} from "react";

export default function Movie(props) {
  return (
    <div>
      <img src={props.movie.Poster} />
      <div>{props.movie.Title}</div>
    </div>
  );
}

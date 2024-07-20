import {useEffect, useState} from "react";

export default function Movie(props) {
  return (
    <div className="MovieComponent">
      <img src={props.movie.Poster} />
      <div>{props.movie.Title}</div>
    </div>
  );
}

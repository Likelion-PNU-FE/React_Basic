import {useEffect, useRef, useState} from "react";
import Movie from "./Movie";

export default function MovieList() {
  const key = process.env.REACT_APP_API_KEY;
  const url = `http://www.omdbapi.com/?apikey=${key}`;
  const movieRef = useRef(null);
  const [movies, setMovies] = useState([]);
  // const [page, setPage] = useState(1);

  const onClickSearch = () => {
    const search = movieRef.current.value;
    getMovieList(search);
  };

  const getMovieList = async (search, page) => {
    console.log(search);
    const res = await fetch(`${url}&s=${search}&${page}`);
    const data = await res.json();
    const arrData = Object.values(data.Search);
    setMovies(arrData);
    console.log(movies);

    return movies;
  };

  const paging = (page) => {
    // const search = movieRef.current.value;
    // getMovieList("frozen", page);
  };

  return (
    <div className="movies">
      <div>
        <h2>MOVIE</h2>
        <input
          type="text"
          placeholder="영화 이름을 검색하세요"
          ref={movieRef}
        />
        <button onClick={onClickSearch}>검색</button>
      </div>

      <h2>MOVIE LIST</h2>
      {movies == []
        ? null
        : movies.map((movie) => <Movie movie={movie} key={movie.imdbID} />)}

      <div>
        <span onClick={paging(1)}>pagination</span>
      </div>
    </div>
  );
}

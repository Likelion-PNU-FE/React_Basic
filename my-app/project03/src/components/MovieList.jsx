import {useCallback, useEffect, useRef, useState} from "react";
import Movie from "./Movie";
import axios from "axios";

export default function MovieList() {
  const key = process.env.REACT_APP_API_KEY;
  const movieRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  // infinity scroll
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (entries) observer.current.observe(entries);
    },
    [hasMore]
  );

  const instance = axios.create({
    baseURL: `http://www.omdbapi.com/`,
    params: {
      apikey: key,
    },
  });

  instance.interceptors.request.use(
    (config) => {
      console.log("로딩중...");
      config.params = {
        ...config.params,
      };
      return config;
    },
    (error) => {
      console.log("error");
    }
  );

  const onClickSearch = () => {
    const search = movieRef.current.value;

    setMovies([]);
    setPage(1);
    getMovieList(search, page);

    getMovieList(search);
  };

  useEffect(() => {
    if (page > 1) {
      const search = movieRef.current.value;
      getMovieList(search, page);
    }
  }, [page]);

  const getMovieList = async (search, page) => {
    try {
      const res = await instance.get("", {
        params: {
          s: search,
          page: page,
        },
      });

      if (res.data.Response === "True") {
        const arrData = res.data.Search || [];
        setMovies((prevMovies) => {
          const newMovies = arrData.filter(
            (movie) =>
              !prevMovies.some((prevMovie) => prevMovie.imdbID === movie.imdbID)
          );
          return [...prevMovies, ...newMovies];
        });
        setHasMore(arrData.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("error!!!!! : ", error.message);
    }
  };

  // const paging = (page) => {
  //   const search = movieRef.current.value;
  //   getMovieList("frozen", page);
  // };

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

      {movies.length === 0
        ? null
        : movies.map((movie, index) => (
            <div
              key={movie.imdbID}
              ref={index === movies.length - 1 ? handleObserver : null}
            >
              <Movie movie={movie} />
            </div>
          ))}

      <div>
        <span>pagination</span>
      </div>
    </div>
  );
}

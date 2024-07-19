// MovieList랑 MovieItem 분리해도 되나 굳이 할 필요 없어서 안 했음

import React from 'react';
import '../styles/MovieList.css';

// 리스트 생성 ( 10개 )
const MovieList = ({ movies, onMovieClick }) => {
    return (
        //키 속성 -> 고유 식별 위해 사용 / 없어도 되나 경고 메시지
        <div className='movieList_container'>
            <div className='movie_list'>
                {movies.map((movie) => (
                    <MovieItem key={movie.imdbID} movie={movie} onMovieClick={onMovieClick} />
                ))}
            </div>
        </div>
    );
};

// 한 개 각각 값의 poster랑 제목 형성, 포스터 클릭하면 해당 포스터 ID로 넘어감
const MovieItem = ({ movie, onMovieClick }) => {
    return (
        <div className='movie_item'>
            <div className='movie_poster_container'>
                <img src={movie.Poster} alt='' className='movie_poster' onClick={() => onMovieClick(movie.imdbID)} />
            </div>

            <h2 className='movie_title'>{movie.Title}</h2>
            <h3 className='movie_year'>{movie.Year}</h3>
        </div>
    );
};

export default MovieList;

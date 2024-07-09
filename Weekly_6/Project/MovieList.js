// MovieList랑 MovieItem 분리해도 되나 굳이 할 필요 없어서 안 했음

import React from 'react';

// 리스트 생성 ( 10개 )
const MovieList = ({ movies, onMovieClick }) => {
    return (
        // 키 속성 -> 고유 식별 위해 사용 / 없어도 되나 경고 메시지
        <div>
            {movies.map((movie) => (
                <MovieItem key={movie.imdbID} movie={movie} onMovieClick={onMovieClick} />
            ))}
        </div>
    );
};

// 한 개 각각 값의 poster랑 제목 형성, 포스터 클릭하면 해당 포스터 ID로 넘어감
const MovieItem = ({ movie, onMovieClick }) => {
    return (
        <div onClick={() => onMovieClick(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title}의 포스터`} />
            <h2>{movie.Title}</h2>
        </div>
    );
};

export default MovieList;

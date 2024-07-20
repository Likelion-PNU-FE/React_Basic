// MovieList랑 MovieItem 분리해도 되나 굳이 할 필요 없어서 안 했음

import React from 'react';
import '../styles/MovieList.css';
import Skeleton from './Skeleton';
import likelionLogo from '../images/likelion_logo.png';

// 리스트 생성 ( 10개 )
const MovieList = ({ movies, onMovieClick, loading }) => {
    const skeletons = Array(10).fill(0); // 스켈레톤 10개를 생성

    return (
        <div className='movieList_container'>
            <div className='movie_list'>
                {movies.map((movie) => (
                    <MovieItem key={movie.imdbID} movie={movie} onMovieClick={onMovieClick} />
                ))}
                {loading && skeletons.map((_, index) => <Skeleton key={index} />)}
            </div>
        </div>
    );
};

// 한 개 각각 값의 poster랑 제목 형성, 포스터 클릭하면 해당 포스터 ID로 넘어감
const MovieItem = ({ movie, onMovieClick }) => {
    const handleError = (error) => {
        error.target.src = likelionLogo;
    };

    return (
        <div className='movie_item'>
            <div className='movie_poster_container'>
                <img
                    src={movie.Poster}
                    alt=''
                    className='movie_poster'
                    onClick={() => onMovieClick(movie.imdbID)}
                    onError={handleError}
                />
            </div>

            <h2 className='movie_title'>{movie.Title}</h2>
            <h3 className='movie_year'>{movie.Year}</h3>
        </div>
    );
};

export default MovieList;

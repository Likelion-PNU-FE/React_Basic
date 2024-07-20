// src/components/MovieList.js
import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, lastMovieElementRef, onMovieSelect }) => {
    return (
        <div className='movie-list'>
            {movies.map((movie, index) => {
                if (movies.length === index + 1) {
                    return (
                        <MovieCard
                            ref={lastMovieElementRef}
                            key={movie.imdbID}
                            movie={movie}
                            onClick={() => onMovieSelect(movie.imdbID)}
                        />
                    );
                } else {
                    return <MovieCard key={movie.imdbID} movie={movie} onClick={() => onMovieSelect(movie.imdbID)} />;
                }
            })}
        </div>
    );
};

export default MovieList;

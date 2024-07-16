import React from 'react';
import Movie from './Movie';

const MovieList = ({ movies, onMovieSelect }) => {
    return (
        <div className='movie-list'>
            {movies.map((movie) => (
                <Movie key={movie.imdbID} movie={movie} onMovieSelect={onMovieSelect} />
            ))}
        </div>
    );
};

export default MovieList;

import React from 'react';

const Movie = ({ movie, onMovieSelect }) => {
    return (
        <div className='movie' onClick={() => onMovieSelect(movie.imdbID)}>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
        </div>
    );
};

export default Movie;

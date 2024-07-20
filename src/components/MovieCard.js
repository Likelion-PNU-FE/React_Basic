// src/components/MovieCard.js
import React from 'react';

const MovieCard = React.forwardRef(({ movie, onClick }, ref) => (
    <div className='movie-card' ref={ref} onClick={onClick}>
        <img src={movie.Poster} alt={movie.Title} />
        <h2>{movie.Title}</h2>
        <p>{movie.Year}</p>
    </div>
));

export default MovieCard;

import React from 'react';

const MovieDetail = ({ movie, onClose }) => {
    return (
        <div className='movie-detail'>
            <button onClick={onClose}>Close</button>
            <h2>{movie.Title}</h2>
            <img src={movie.Poster} alt={movie.Title} />
            <p>
                <strong>Year:</strong> {movie.Year}
            </p>
            <p>
                <strong>Genre:</strong> {movie.Genre}
            </p>
            <p>
                <strong>Director:</strong> {movie.Director}
            </p>
            <p>
                <strong>Actors:</strong> {movie.Actors}
            </p>
            <p>
                <strong>Plot:</strong> {movie.Plot}
            </p>
        </div>
    );
};

export default MovieDetail;

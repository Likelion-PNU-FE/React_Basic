// src/components/MovieDetail.js
import React from 'react';

const MovieDetail = ({ movie, onClose }) => {
    return (
        <div className='movie-detail'>
            <h2>{movie.Title}</h2>
            <img src={movie.Poster} alt={movie.Title} />
            <p>
                <strong>줄거리: </strong>
                {movie.Plot}
            </p>
            <p>
                <strong>연도:</strong> {movie.Year}
            </p>
            <p>
                <strong>장르:</strong> {movie.Genre}
            </p>
            <p>
                <strong>감독:</strong> {movie.Director}
            </p>
            <button onClick={onClose}>닫기</button>
        </div>
    );
};

export default MovieDetail;

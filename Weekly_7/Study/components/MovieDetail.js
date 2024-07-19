import React, { useState, useEffect } from 'react';
import instance from '../axiosInstance'; // axiosInstance를 불러옵니다.
import '../styles/MovieDetail.css';
import likelionLogo from '../images/likelion_logo.png';

const MovieDetail = ({ imdbID, onBack }) => {
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieData = async () => {
            setLoading(true);
            try {
                const response = await instance.get('/', {
                    params: { i: imdbID },
                });
                const data = response.data;
                console.log(data);
                if (data.Response === 'True') {
                    setMovie(data);
                    setError(null);
                } else {
                    setError(data.Error);
                    setMovie(null);
                }
            } catch (error) {
                console.error('Fetch movie error:', error);
                setError('에러 발생');
                setMovie(null);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieData();
    }, [imdbID]);

    const handleError = (event) => {
        event.target.src = likelionLogo;
    };

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='detail_container'>
            <div className='detail_content_container'>
                <div className='detail_content'>
                    <img className='detail_poster' src={movie.Poster} alt={movie.Title} onError={handleError} />
                    <div className='detail_details'>
                        <h1 className='detail_title'>{movie.Title}</h1>
                        <div className='detail_info'>
                            <p>
                                {movie.Genre} / {movie.Year}
                            </p>
                            <hr />
                            <p>
                                <strong>상영시간</strong>
                                {movie.Runtime}
                            </p>
                            <p>
                                <strong>감독</strong>
                                {movie.Director}
                            </p>
                            <p>
                                <strong>배우</strong>
                                {movie.Actors}
                            </p>
                            <p>
                                <strong>줄거리</strong>
                                {movie.Plot}
                            </p>
                        </div>
                    </div>
                </div>

                <button className='detail_button' onClick={onBack}>
                    Back to Menu
                </button>
            </div>
        </div>
    );
};

export default MovieDetail;

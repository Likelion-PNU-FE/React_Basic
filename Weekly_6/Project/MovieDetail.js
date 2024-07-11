// movie detail은 클릭이 된 경우 movie.Title을 매개변수로 받음
// 매개변수로 받은 Title을 기반으로 fetch를 title 기반으로 함
// 이후 back to menu등으로 돌아갈 수 있도록 함

import React, { useState, useEffect } from 'react';
import './MovieDetail.css';

// 수정1] MovieDetail을 title 기반으로 하니 title 중 가장 먼저나오는 이름에 관해 나옴
// frozen의 경우 2개가 있는데 그 중 첫 번째게 먼저 나오는 문제
// 따라서 title이 아닌 i를 기반으로 하겠음
// 왜 자꾸 에러 발생!이 나오지..? => 그냥 변수 명 오타..
const MovieDetail = ({ imdbID, onBack }) => {
    const apiKey = process.env.REACT_APP_API_KEY;

    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // 랜더링 시마다 fetch를 실행할 것이므로 그냥 useEffect 썼음
    // 함수 -> 함수(title)해도 되긴 함
    useEffect(() => {
        setLoading(true);
        fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.Response === 'True') {
                    setMovie(data);
                    setError(null);
                } else {
                    setError(data.Error);
                    setMovie(null);
                }
            })
            .catch((error) => {
                setError('에러 발생');
                setMovie(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [imdbID, apiKey]);

    // 만약 error라면 앞처럼 error 글자를 띄워줌
    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (loading) {
        // 데이터가 로딩시에 즉 movie = null일 경우에는 Loading을 띄워서 기다리는 중이라 표현
        return <p>Loading...</p>;
    }

    return (
        <div className='detail_container'>
            <div className='detail_content_container'>
                <div className='detail_content'>
                    <img className='detail_poster' src={movie.Poster} alt='' />
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

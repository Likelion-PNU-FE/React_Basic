// movie detail은 클릭이 된 경우 movie.Title을 매개변수로 받음
// 매개변수로 받은 Title을 기반으로 fetch를 title 기반으로 함
// 이후 back to menu등으로 돌아갈 수 있도록 함

import React, { useState, useEffect } from 'react';

// 수정1] MovieDetail을 title 기반으로 하니 title 중 가장 먼저나오는 이름에 관해 나옴
// frozen의 경우 2개가 있는데 그 중 첫 번째게 먼저 나오는 문제
// 따라서 title이 아닌 i를 기반으로 하겠음
// 왜 자꾸 에러 발생!이 나오지..? => 그냥 변수 명 오타..
const MovieDetail = ({ imdbID, onBack }) => {
    const apiKey = process.env.REACT_APP_API_KEY;

    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);

    // 랜더링 시마다 fetch를 실행할 것이므로 그냥 useEffect 썼음
    // 함수 -> 함수(title)해도 되긴 함
    useEffect(() => {
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
            });
    }, [imdbID]);

    // 만약 error라면 앞처럼 error 글자를 띄워줌
    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    // 데이터가 로딩시에 즉 movie = null일 경우에는 Loading을 띄워서 기다리는 중이라 표현
    if (!movie) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{movie.Title}</h1>
            <img src={movie.Poster} alt={`${movie.Title}의 포스터`} />
            <p>{movie.Plot}</p>
            <p>Year: {movie.Year}</p>
            <p>Genre: {movie.Genre}</p>
            <p>Director: {movie.Director}</p>
            <button onClick={onBack}>Back to Menu</button>
        </div>
    );
};

export default MovieDetail;

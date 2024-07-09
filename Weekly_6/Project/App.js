/*
    1. 값 받으면 fetch로 불러와야겠다 = > app.js
    2. 그거 list니까 map으로 각각 띄운다 => MovieList.js , ( 각각 내용들 : MovieItem.js)
    3-1] 만약 버튼을 누르면 해당 page에 해당하는 list를 fetch로 불러온다 => App.js
    - currentPage/totalPage에 해당하는 값이 필요하겠다 -> page수를 알 수 있겠다.
    3-2] 만약 포스터를 누르면 해당하는 title관련한 t="{title}"로 받아온다. => MovieList.js에서 MovieItem.js로 넘어간다.
    -> 3-2 수정] t값으로 받으면 중복 시 처음거만 나오니까 idmbID로 받자
    */

import React, { useState } from 'react';
import InputButton from './InputButton';
import MovieDetail from './MovieDetail';
import MovieList from './MovieList';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovieID, setSelectedMovieID] = useState(null);
    // 에러 뜨니까 페이지 전체에 error가 나와서 error 변수 추가
    const [error, setError] = useState(null);

    const apiKey = process.env.REACT_APP_API_KEY;

    const setInputMovie = (name) => {
        // 기존 set SelectedMovie null 없을 때 검색을 입력하면 바로 복귀하지 않고
        // back to menu를 누른 다음에야 원래로 돌아가는 문제가 있었음. 그래서 추가
        setSelectedMovieID(null);
        fetchMovies(name);
    };

    // title을 입력했을 때 뜨는 10개의 리스트에 대한 반환
    const fetchMovies = (name) => {
        // 최초로 받는 response를 res에 넣고 이걸 json해줘서 JSON형태로 바꿔줌
        fetch(`https://www.omdbapi.com/?s=${name}&apikey=${apiKey}`)
            // 이후 JSON으로 바뀌어진 형태를 data에 받음
            .then((res) => res.json())
            .then((data) => {
                // data는 Response로 True를 줄 수도 False를 줄 수도 있음 ( True는 성공 , False는 값을 못받아옴 을 의미)
                if (data.Response === 'True') {
                    setMovies(data.Search);
                    setError(null);
                } else {
                    setError(data.Error);
                    setMovies([]);
                }
            })
            .catch((error) => {
                setError('에러 발생');
                setMovies([]);
            });
    };

    // handleMovieClick 은 클릭되면 해당 Poster에 맞는 ID값을 받기위해 만듦
    // ID값을 받으면 null에서 ID값으로 변경되기에 해당 ID에 맞는 포스터가 렌더링
    const handleMovieClick = (imdbID) => {
        setSelectedMovieID(imdbID);
    };

    // handleBackClick은 클릭되면 null을 받아서 List가 렌더링 됨
    // 포스터에서 back to Menu 버튼을 누르면 실행되는 익명함수
    const handleBackClick = () => {
        setSelectedMovieID(null);
    };

    //JSX 내부 IF문 사용 불가로 조건문연산자 / 삼항연산자 가능
    /*
        {selectedMovieID && <MovieDetail imdbID={selectedMovieID} onBack={handleBackClick} />}
        {!selectedMovieID && <MovieList movies={movies} onMovieClick={handleMovieClick} />}


        {selectedMovieID ? (
                <MovieDetail imdbID={selectedMovieID} onBack={handleBackClick} />
            ) : (
                <MovieList movies={movies} onMovieClick={handleMovieClick} />
            )}
    */
    return (
        <div>
            <InputButton setInputMovie={setInputMovie} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {selectedMovieID ? (
                <MovieDetail imdbID={selectedMovieID} onBack={handleBackClick} />
            ) : (
                <MovieList movies={movies} onMovieClick={handleMovieClick} />
            )}
        </div>
    );
};

export default App;

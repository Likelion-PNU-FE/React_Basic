/*
    0. 값 받기 : InputButton.js
    1. 값 받으면 fetch로 불러와야겠다 = > app.js
    2. 그거 list니까 map으로 각각 띄운다 => MovieList.js , ( 각각 내용들 : MovieItem.js)
    3] 포스터를 누르면 해당하는 title관련한 t="{title}"로 받아온다. => MovieList에서 MovieItem으로 넘어간다. => MovieDetail
    -> 수정] t값으로 받으면 중복 시 처음거만 나오니까 idmbID로 받자
    4]버튼을 누르면 해당 page에 해당하는 list를 fetch로 불러온다 => App.js
    - currentPage/totalPage에 해당하는 값이 필요하겠다 -> page수를 알 수 있겠다.
    */

import React, { useState } from 'react';
import InputButton from './InputButton';
import MovieDetail from './MovieDetail';
import MovieList from './MovieList';
import PageButton from './PageButton';
import './App.css';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovieID, setSelectedMovieID] = useState(null);
    // 에러 뜨니까 페이지 전체에 error가 나와서 error 변수 추가
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Loading 상태 추가
    const [currentPage, setCurrentPage] = useState(1);
    // null은 DOM이 FALSE이자 RENDERING 하지 않음 / 하지만 0은 FALSE로 인식하지만 RENDERING 하기에 0으로 하면 버튼 값으로 0이 뜰 때가 존재함. 그래서 NULL로 설정
    const [totalPages, setTotalPages] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // 페이지 찾으려보니 searchTerm이 필요함( frozen같이 처음 넣은 주제 값 )

    const apiKey = process.env.REACT_APP_API_KEY;

    const setInputMovie = (name) => {
        // 기존 set SelectedMovie null 없을 때 검색을 입력하면 바로 복귀하지 않고
        // back to menu를 누른 다음에야 원래로 돌아가는 문제가 있었음. 그래서 추가
        setSelectedMovieID(null);
        setSearchTerm(name);
        setCurrentPage(1);
        // 여기서 currentPage(1)이 입력되기 전에 fetchMovie를 받아서
        // rendering 시에 원래 있던 페이지로 뜸 -> useEffect 쓰려고 했으나 useEffect는 모든 종속변수에 대해서 받아서 못썼음 -> fetchMovies(name, 1)이라고 그냥 했음
        fetchMovies(name, 1);
    };

    // title을 입력했을 때 뜨는 10개의 리스트에 대한 반환
    const fetchMovies = (name, page) => {
        setLoading(true); // Loading 시작

        // 최초로 받는 response를 res에 넣고 이걸 json해줘서 JSON형태로 바꿔줌
        fetch(`https://www.omdbapi.com/?s=${name}&apikey=${apiKey}&page=${page}`)
            // 이후 JSON으로 바뀌어진 형태를 data에 받음
            .then((res) => res.json())
            .then((data) => {
                // data는 Response로 True를 줄 수도 False를 줄 수도 있음 ( True는 성공 , False는 값을 못받아옴 을 의미)
                if (data.Response === 'True') {
                    setTotalPages(data.totalResults); // 전체 갯수 반환
                    setMovies(data.Search);
                    setError(null);
                } else {
                    setError(data.Error);
                    setMovies([]);
                    setTotalPages(null);
                }
            })
            .catch((error) => {
                setError('에러 발생');
                setMovies([]);
                setTotalPages(null);
            })
            .finally(() => {
                setLoading(false);
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

    // set Input movie(초기) 와 handlePageChange 에서 둘 모두 page 변화 시 fetchMovie 부르길래 useEffect 쓰려했으나
    // name 변경 시를 포함 시킬 경우 name만 변경됐는데 page는 3page로 뜨는 경우도 생길거라 생각했음
    // 따라서 useEffect 안쓰고 그냥 fetchMovies로 했음
    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchMovies(searchTerm, page);
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
            {loading ? (
                <p>Loading...</p> // Loading 메시지
            ) : selectedMovieID ? (
                <MovieDetail imdbID={selectedMovieID} onBack={handleBackClick} />
            ) : (
                <div>
                    <MovieList movies={movies} onMovieClick={handleMovieClick} />
                    {totalPages && (
                        <div className='page_button_container'>
                            <PageButton
                                totalMovies={totalPages}
                                currentPage={currentPage}
                                handlePageChange={handlePageChange}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;

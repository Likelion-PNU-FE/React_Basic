import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import Pagination from './components/Pagination';
import MovieDetail from './components/MovieDetail';
import './App.css';

const App = () => {
    const [movies, setMovies] = useState([]); //영화 목록
    const [query, setQuery] = useState(''); //검색한 쿼리를 저장. 참고로 쿼리는 데이터베이스에서 원하는 정보를 가져오기 위한 명령문이란다
    const [currentPage, setCurrentPage] = useState(1); //페이지 저장... 초깃값이 1인 거임
    const [selectedMovie, setSelectedMovie] = useState(null); //선택한 영화 상세 정보
    const API_KEY = process.env.REACT_APP_API_KEY; //API 호출함

    const fetchMovies = useCallback(async (searchQuery, page) => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&page=${page}&apikey=${API_KEY}`); //fetch 함수로 api에 get 요청을 보냄
            const data = await response.json(); //response.json()로 json으로 바꿔서 data 변수에 저장

            if (data.Response === 'True') {
                //true면
                setMovies(data.Search); //업데이트 함
            } else {
                //아니면
                setMovies([]); //빈 배열 업데이트
            }
        } catch (error) {
            console.error('영화 데이터를 가져오는 중 오류 발생:', error); //오류면 오류라 함
        }
    }, []);

    const fetchMovieDetails = useCallback(async (imdbID) => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
            const data = await response.json();

            if (data.Response === 'True') {
                setSelectedMovie(data);
            } else {
                setSelectedMovie(null);
            }
        } catch (error) {
            console.error('영화 상세 정보를 가져오는 중 오류 발생:', error);
        }
    }, []);

    useEffect(() => {
        if (query) {
            //query가 비어있지 않을 때만 저 함수 호출한다. 영화 검색을 할 때만 그 영화 데이터를 가져오는 거
            fetchMovies(query, currentPage);
        }
    }, [query, currentPage, fetchMovies]); //얘네 셋 바뀌면 실행됨

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleMovieSelect = (imdbID) => {
        fetchMovieDetails(imdbID);
    };

    const handleCloseDetail = () => {
        setSelectedMovie(null);
    };

    return (
        <div className='App'>
            <h1>영화 검색</h1>
            <SearchBar onSearch={handleSearch} />
            <MovieList movies={movies} onMovieSelect={handleMovieSelect} />
            <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
            {selectedMovie && <MovieDetail movie={selectedMovie} onClose={handleCloseDetail} />}
        </div>
    );
};

export default App;

//set 붙으면 다 업데이트임

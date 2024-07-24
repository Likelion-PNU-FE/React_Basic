// src/App.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import './App.css';
import './styles.css';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [hasMore, setHasMore] = useState(true); //hasMore은 현재 페이지에 추가적인 영화 데이터가 있는가? 있다고 일단 가정하기 때문에 초깃값이 true
    const [loading, setLoading] = useState(false); //현재 데이터를 로딩 중인가? API 요청 보내는 동안만 true
    const API_KEY = process.env.REACT_APP_API_KEY;
    const observer = useRef(); //이 변수를 사용하여 특정 DOM 요소를 관찰(observer)하여 사용자가 페이지의 끝에 도달했을 때 추가 데이터를 로드하는 트리거

    const fetchMovies = useCallback(
        //useCallback은 API가 바뀌지 않는 한 동일함
        async (searchQuery, page) => {
            setLoading(true); //true면 추가할 게 있다는 거니까 들고 옴
            try {
                //요청 성공하면 try
                const response = await axios.get(`https://www.omdbapi.com/`, {
                    //요청 받기 성공하면 response에 JSON으로 저장
                    //그 보내는 url이랑 변수에 get 요청 보냄. await는 받을 때까지 기다린다
                    params: {
                        s: searchQuery, //영화 제목. searchQuery에 저장된 값
                        page: page,
                        apikey: API_KEY, //axios 사전 설정하는 파일을 만듦. 인증 절차를 해서? 인터셉터 ㅎㅎ
                    },
                });
                const data = response.data;
                console.log(
                    'API 호출 URL:',
                    `https://www.omdbapi.com/?s=${searchQuery}&page=${page}&apikey=${API_KEY}`
                );
                console.log('API 응답 데이터:', data);
                if (data.Response === 'True') {
                    setMovies((prevMovies) => [...prevMovies, ...data.Search]);
                    setHasMore(data.Search.length > 0);
                } else {
                    setHasMore(false);
                }
            } catch (error) {
                //요청 실패하면 catch
                console.error('영화 데이터를 가져오는 중 오류 발생:', error);
            } finally {
                setLoading(false); //요청이 완료되면 false로 바꿈
            }
        },
        [API_KEY]
    );

    const fetchMovieDetails = useCallback(
        async (imdbID) => {
            try {
                const response = await axios.get(`https://www.omdbapi.com/`, {
                    params: {
                        i: imdbID,
                        apikey: API_KEY,
                    },
                });
                const data = response.data;
                console.log('상세 정보 API 호출 URL:', `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
                console.log('상세 정보 API 응답 데이터:', data);
                if (data.Response === 'True') {
                    setSelectedMovie(data);
                } else {
                    setSelectedMovie(null);
                }
            } catch (error) {
                console.error('영화 상세 정보를 가져오는 중 오류 발생:', error);
            }
        },
        [API_KEY]
    );

    useEffect(() => {
        if (query) {
            fetchMovies(query, currentPage);
        }
    }, [query, currentPage, fetchMovies]);

    const lastMovieElementRef = useCallback(
        (node) => {
            if (loading) return; //로딩 중이면 새로운 관찰 중지하고 종료함. 중복 요청 방지
            if (observer.current) observer.current.disconnect(); //기존에 설정된 IntersectionObserver가 있으면 disconnect하여 이전 관찰을 중지
            observer.current = new IntersectionObserver((entries) => {
                //새로운 IntersectionObserver(요소가 나타나는 것을 감지) 생성. 이거 이름을 observer.current라고 붙임
                if (entries[0].isIntersecting && hasMore) {
                    //요소가 뷰포트에 진입했고 추가 데이터를 불러올 수 있다면
                    setCurrentPage((prevPage) => prevPage + 1); //페이지를 증가시킴
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
        setCurrentPage(1);
        setMovies([]);
        setHasMore(true);
    };

    const handleMovieSelect = (imdbID) => {
        fetchMovieDetails(imdbID);
    };

    const handleCloseDetail = () => {
        setSelectedMovie(null);
    };

    return (
        <div className='App'>
            {' '}
            {/*이렇게 주석. 중괄호도 붙여서*/}
            <h1>영화 검색</h1>
            <SearchBar onSearch={handleSearch} />
            <MovieList movies={movies} lastMovieElementRef={lastMovieElementRef} onMovieSelect={handleMovieSelect} />
            {loading && <p>로딩 중...</p>}
            {selectedMovie && <MovieDetail movie={selectedMovie} onClose={handleCloseDetail} />}
        </div>
    );
};

export default App;
//set 붙으면 다 업데이트임

// infinity scroll 잘 되는데 계속 loading 되는 문제가 있음..?
// setLoading을 fetchMovies 받을때마다 해서 그런 듯

import React, { useEffect, useState, useRef, useCallback } from 'react';
import InputButton from './components/InputButton';
import MovieDetail from './components/MovieDetail';
import MovieList from './components/MovieList';
import instance from './axiosInstance';
import './styles/App.css';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovieID, setSelectedMovieID] = useState(null);
    // 에러 뜨니까 페이지 전체에 error가 나와서 error 변수 추가
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Loading 상태 추가
    const [currentPage, setCurrentPage] = useState(1);
    // null은 DOM이 FALSE이자 RENDERING 하지 않음 / 하지만 0은 FALSE로 인식하지만 RENDERING 하기에 0으로 하면 버튼 값으로 0이 뜰 때가 존재함. 그래서 NULL로 설정
    const [searchTerm, setSearchTerm] = useState(''); // 페이지 찾으려보니 searchTerm이 필요함( frozen같이 처음 넣은 주제 값 )
    const [totalPages, setTotalPages] = useState(1);

    const observerRef = useRef(null);

    const handleObserver = useCallback((entries) => {
        const target = entries[0]; // 가장 먼저 교차 요소가 변경된 요소를 가져옴??..
        if (target.isIntersecting && currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    });

    useEffect(() => {
        const option = {
            root: null, //기본 값 Root (viewport)
            threshold: 1.0, //임계값 설정 (옵저빙 중인 요소가 100% 보이면 callback 실행)
        };
        //옵저빙 객체 생성
        const observer = new IntersectionObserver(handleObserver, option);
        const currentObserverRef = observerRef.current;

        //옵저빙 설정
        if (currentObserverRef) {
            observer.observe(currentObserverRef);
        }

        return () => {
            if (currentObserverRef) {
                observer.unobserve(currentObserverRef);
            }
        };
    }, [handleObserver]);

    const setInputMovie = (name) => {
        // 기존 set SelectedMovie null 없을 때 검색을 입력하면 바로 복귀하지 않고
        // back to menu를 누른 다음에야 원래로 돌아가는 문제가 있었음. 그래서 추가
        setSelectedMovieID(null);
        setSearchTerm(name);
        setCurrentPage(1);
        setMovies([]); // 새로운 값이 들어오면 Movies 배열 초기화로 혹시 모를 중복 방지
        fetchMovies(name, 1);
    };

    // title을 입력했을 때 뜨는 10개의 리스트에 대한 반환
    const fetchMovies = async (name, page = 1) => {
        if (page === 1) {
            setLoading(true);
        }

        try {
            const res = await instance.get('/', {
                params: {
                    s: name,
                    page: page,
                },
            });
            console.log(res.data);
            const data = res.data;
            if (data.Response === 'True') {
                if (page === 1) {
                    setMovies(data.Search);
                    setTotalPages(Math.ceil(data.totalResults / 10));
                } else {
                    setMovies((prevMovies) => [...prevMovies, ...data.Search]);
                }
                setError(null);
            } else {
                setError(data.Error);
                setMovies([]);
            }
        } catch (error) {
            console.error('Fetch movies error:', error);
            setError('에러 발생');
            setMovies([]);
        } finally {
            setLoading(false);
        }
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

    useEffect(() => {
        if (currentPage > 1) {
            fetchMovies(searchTerm, currentPage);
        }
    }, [currentPage]);

    //왜.. infinity scroll이 원하는 것처럼 안 나오지..? 1p씩 나와야 하는데.. 팍하고 나오네..?
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
                    <div ref={observerRef} style={{ height: '1px' }}></div>
                </div>
            )}
        </div>
    );
};

export default App;

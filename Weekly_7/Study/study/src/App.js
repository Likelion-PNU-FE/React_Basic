import React, { useEffect, useState, useRef, useCallback } from 'react';
import InputButton from './components/InputButton';
import MovieDetail from './components/MovieDetail';
import MovieList from './components/MovieList';
import instance from './axiosInstance';
import './styles/App.css';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovieID, setSelectedMovieID] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const observerRef = useRef(null);

    const handleMovieClick = (imdbID) => {
        setSelectedMovieID(imdbID);
    };

    const handleBackClick = () => {
        setSelectedMovieID(null);
    };

    const setInputMovie = (name) => {
        if (name === searchTerm) {
            return;
        } // 동일한 값 계속 입력하면 prev 1 증가하는 문제 때문에 추가했음
        setSelectedMovieID(null);
        setMovies([]);
        setSearchTerm(name);
    };

    // 기존 setInputMovie 내에 curPage 종속으로 인한 useEffect 이용을 위해 fetchMovies를 setInputMovie에 안 넣었음
    // 따라서 searchTerm이 변경되고 나서 setCurrentPage를 불러오는 것으로 만들었음
    useEffect(() => {
        if (searchTerm) {
            setCurrentPage(1);
            // 기존 searchTerm 실행할 때 page가 원래 1이라면 currentPage 변경에 대한 useEffect를 안 부르는 문제가 있어 변경했음
            fetchMovies(searchTerm, 1);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchMovies(searchTerm, currentPage);
    }, [currentPage]);

    const fetchMovies = async (name, page = 1) => {
        if (!name) {
            return;
        } // name이 빈 배열일 때 또한 searchTerm에 종속된 useEffect때문에 fetchMovies 실행함. 이를 막기위해 빈 배열이면 return;을 바로 해줬음
        console.log(name, page);
        setLoading(true);
        try {
            const res = await instance.get('/', {
                params: {
                    s: name,
                    page: page,
                },
            });
            const data = res.data;
            if (data.Response === 'True') {
                setTimeout(() => {
                    if (page === 1) {
                        setMovies(data.Search);
                        setTotalPages(Math.ceil(data.totalResults / 10));
                    } else {
                        setMovies((prevMovies) => [...prevMovies, ...data.Search]);
                    }
                    setError(null);
                    setLoading(false);
                }, 1000); // 1초 지연
            } else {
                setError(data.Error);
                setMovies([]);
                setTotalPages(1);
                setLoading(false);
            }
        } catch (error) {
            setError('에러 발생');
            setMovies([]);
            setTotalPages(1);
            setLoading(false);
        }
    };

    const handleObserver = useCallback(
        (entries) => {
            const target = entries[0]; // 가장 먼저 교차 요소가 교차된 친구를 가져옴
            if (target.isIntersecting && currentPage < totalPages && !loading) {
                setCurrentPage((prevPage) => prevPage + 1);
            }
        },
        [totalPages, loading] // loading이 포함이 안 되면 한 번에 계속 내릴 때 다음 게 안 뜸, currentPage는 없어도 됨
    );

    useEffect(() => {
        const option = {
            root: null,
            threshold: 0.9, // 왜 1.0이면 구현이 안 될까?
        };
        const observer = new IntersectionObserver(handleObserver, option);
        const currentObserverRef = observerRef.current;

        if (currentObserverRef) {
            observer.observe(currentObserverRef);
        }

        return () => {
            if (currentObserverRef) {
                observer.unobserve(currentObserverRef);
            }
        };
    }, [handleObserver, selectedMovieID]); // useCallback이나 여기에 selectedMovieID를 넣지 않으면 Detail을 보고 back to Menu로 오고나서 infinite Scroll 적용 안 됨

    return (
        <div>
            <InputButton setInputMovie={setInputMovie} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {selectedMovieID ? (
                <MovieDetail imdbID={selectedMovieID} onBack={handleBackClick} />
            ) : (
                <div>
                    <MovieList movies={movies} onMovieClick={handleMovieClick} loading={loading} />
                    <div ref={observerRef} style={{ height: '50px' }}></div>
                </div>
            )}
        </div>
    );
};

export default App;

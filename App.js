import React, { useRef } from 'react';
import './App.css';

const inputRef = useRef(null);
const API_KEY = process.env.REACT_APP_API_KEY;
const App = () => {
    const [movies, setMovies] = useState([]);

    function searchMovie() {
        async (query) => {
            const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=REACT_APP_API_KEY`);
            const data = await response.json();
            setMovies(data.Search || []);
        };
    }

    // function searchMovie() {
    //     const movieName = {
    //         text: inputRef.current.value,
    //     };

    inputRef.current.value = '';
};
return (
    <div className='App'>
        <h1>영화 검색</h1>

        <div className='Search'>
            <input type='text' ref={inputRef} id='movie' placeholder='영화 제목을 입력해주세요' />
        </div>
        <button id='Btn' onClick={searchMovie}>
            검색
        </button>
    </div>
);

export default App;

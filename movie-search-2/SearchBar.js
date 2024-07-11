import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        //함수가 실행될 때 이걸 꼭 들고 가겠다. e가 속성을 다 들고 있음
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); //기본 이벤트를 없앰
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit}>
            {' '}
            //검색이 되는 순간 form 안에 있는 게 다 핸들서밋에 매개변수 e로 들어감
            <input type='text' value={query} onChange={handleInputChange} placeholder='영화 제목을 입력하세요' />
            <button type='submit'>검색</button>
        </form>
    );
};

export default SearchBar;

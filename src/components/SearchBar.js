// src/components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' value={query} onChange={handleInputChange} placeholder='영화 제목을 입력하세요' />
            <button type='submit'>검색</button>
        </form>
    );
};

export default SearchBar;

import React from 'react';

const Pagination = ({ currentPage, onPageChange }) => {
    return (
        <div className='pagination'>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                이전
            </button>
            <span>{currentPage}</span>
            <button onClick={() => onPageChange(currentPage + 1)}>다음</button>
        </div>
    );
};

export default Pagination;

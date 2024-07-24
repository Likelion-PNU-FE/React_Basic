/*
    useEffect 동작에 관한 의문?
    PageButton에서 click하면 currentPage가 변하는데, 이때 변했으니까 바로 여기있는 useEffect로 올까? 아니면 App 렌더링 먼저하고 올까?

    결론 : 상위에 있는 App에서 currentPage 변경으로 다시 렌더링 하고 그로 인해 Pagebutton의 매개변수로 오는 currentPage가 변경 돼 useEffect 실행

*/

import React, { useState, useEffect } from 'react';

const PageButton = ({ totalMovies, currentPage, handlePageChange }) => {
    // 올림수 구하기 위해 Math.ceil
    const totalPages = Math.ceil(totalMovies / 10);
    const [startPage, setStartPage] = useState(1);

    useEffect(() => {
        const newStartPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
        setStartPage(newStartPage);
    }, [currentPage]);

    const handleClick = (page) => {
        handlePageChange(page);
    };

    // 이전거의 시작 페이지
    // useState : set~~로 하게 되면 현재 값에 대한 걸 자동으로 불러와서 함 따라서 아래에서 prev는 현재의 startPage ( 변하기 전의 startPage )
    const handlePrevious = () => {
        setStartPage((prev) => Math.max(prev - 10, 1));
    };
    // 다음거의 시작 페이지
    const handleNext = () => {
        setStartPage((prev) => Math.min(prev + 10, totalPages));
    };

    const endPage = Math.min(startPage + 9, totalPages);

    return (
        // 함수 반환할 때 ()로 감싸안아야지 {}로 감싸면 안 됨
        <div>
            <button onClick={handlePrevious} disabled={startPage === 1}>
                {'<'}
            </button>
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                <button
                    key={index + startPage}
                    onClick={() => handleClick(index + startPage)}
                    // disabled : 상호작용 할 수 없도록 하는 것
                    // 이 경우 선택된 page와는 상호작용이 안 되도록 막아줬음
                    disabled={currentPage === index + startPage}
                >
                    {index + startPage}
                </button>
            ))}
            <button onClick={handleNext} disabled={endPage === totalPages}>
                {'>'}
            </button>
        </div>
    );
};

export default PageButton;

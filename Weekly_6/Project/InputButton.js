import React, { useState } from 'react';

function InputButton({ setInputMovie }) {
    const [topic, setTopic] = useState('');

    const InputChange = (event) => {
        setTopic(event.target.value);
    };

    const findMovie = () => {
        if (topic.trim() === '') {
            alert('값을 입력해주세요!');
            return;
        }

        setInputMovie(topic);
        setTopic('');
    };

    return (
        <div>
            <input type='text' value={topic} onChange={InputChange} placeholder='할 일을 입력해주세요'></input>
            <button onClick={findMovie} className='submit-button'>
                작성하기
            </button>
        </div>
    );
}

export default InputButton;

import React, { useState } from 'react';
import '../styles/InputButton.css';

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
        <div className='container'>
            <div className='input_container'>
                <input
                    type='text'
                    value={topic}
                    onChange={InputChange}
                    placeholder='영화 제목을 입력해주세요'
                    className='input_field'
                ></input>
                <button onClick={findMovie} className='submit_button'>
                    {'>'}
                </button>
            </div>
        </div>
    );
}

export default InputButton;

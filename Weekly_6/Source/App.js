import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
    // 로컬 스토리지에서 todos를 불러옴
    const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem('todos');
        return storedTodos ? JSON.parse(storedTodos) : [];
    });
    const [input, setInput] = useState('');

    // todos가 변경될 때마다 로컬 스토리지에 JSON문자열로 변환 후 저장
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // todo 추가
    const addTodo = () => {
        if (input.trim()) {
            setTodos([...todos, { text: input, completed: false }]);
            setInput('');
        }
    };

    // todo 삭제
    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    // todo 완료표시
    const completeTodo = (index) => {
        const newTodos = todos.map((todo, i) => {
            if (i === index) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodos(newTodos);
    };

    // 투두 갯수 카운트
    const completedTodosCount = todos.filter((todo) => todo.completed).length;

    return (
        <div className='max-w-md mx-auto p-5 font-sans'>
            <h1 className='text-2xl font-bold mb-5 text-center'>Todo List</h1>
            <div className='flex mb-5'>
                <input
                    id='todoInput'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className='flex-grow p-2 border rounded'
                    placeholder='할 일을 입력해주세요'
                />
                <button onClick={addTodo} className='ml-2 bg-yellow-500 text-white p-2 rounded'>
                    작성하기
                </button>
            </div>
            <ul className='space-y-4'>
                {todos.map((todo, index) => (
                    <li key={index} className='flex items-center justify-between p-2 border rounded'>
                        <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                            {todo.text}
                        </span>
                        <div className='flex space-x-2'>
                            <button
                                onClick={() => completeTodo(index)}
                                className={`border rounded p-2 ${
                                    todo.completed
                                        ? 'border-yellow-500 text-yellow-500'
                                        : 'border-green-500 text-green-500'
                                }`}
                            >
                                {todo.completed ? '취소' : '완료'}
                            </button>
                            <button
                                onClick={() => deleteTodo(index)}
                                className='border border-red-500 text-red-500 rounded p-2'
                            >
                                삭제
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className='mt-4 text-center'>
                {completedTodosCount} / {todos.length} 완료
            </div>
        </div>
    );
}

export default App;

import logo from './logo.svg';
import './App.css';
import React, { useState,useCallback,useRef } from 'react';
import TodoList from './TodoList';
import TodoListItem from './TodoListItem';
import Insert from './insert';

function App() {
   const [todos, setTodos] = useState([
    {
      id:1,
      text: 'study',
      checked: false,
    },
    {
      id:2,
      text: 'wash',
      checked: false,
    },
    {
      id:3,
      text: 'wake up',
      checked: true,
    }
   ])

   const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [todos],
  );
  
   const nextId = useRef(4);//초기값
  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo)); //concat(): 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열 반환
      nextId.current++; //nextId 1씩 더하기
    },
    [todos],
  );

  return (
    <div className="App">
      <div className = "Name">
        Todo List
      </div>

      <div className='insert'>
        <Insert onInsert={onInsert}/>
      </div>
      <div className = "blank">
      <TodoList
        todos={todos}
        onToggle={onToggle}
      />
      </div>
    </div>
  );
}

export default App;

import './TodoList.css';
import React, { useState } from 'react';
import TodoListItem from './TodoListItem';

function TodoList({todos, onToggle}) {
    return (
        <ul className='todoList'>
            {todos.map((todo)=>(
                <TodoListItem
                 todo={todo}
                 key={todo.id}
                 onToggle={onToggle}
                 />
            ))}
        </ul>
    )
}

export default TodoList;
import './TodoListItem.css';
import React, { useState } from 'react';
import TodoList from './TodoList';


function TodoListItem({todo, onToggle}) {
    const {id, text, checked} = todo;
    const [isChecked, setIsChecked] = useState(checked);

    const handleCheck = () => {
        setIsChecked(!isChecked);
        onToggle(id); // 해당 항목의 id를 전달하여 상태 업데이트
      };

    
    return(
        <div>
            <div className={`text ${isChecked ? 'checked' : ''}`}>
                {text}
            </div>
        <li className='Item'>
            
            <div className='check'>
                <button className='checkButton' onClick={handleCheck}>
                check
                </button>
              
            </div>
            <div className='delete'>
                <button className='deleteButton'>
                delete
                </button>
            
            </div>
        </li>
        </div>
    )
}

export default TodoListItem; 
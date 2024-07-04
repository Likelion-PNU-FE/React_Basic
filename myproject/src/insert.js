import './TodoList.css';
import React, { useCallback, useState } from 'react';

function Insert({onInsert}){
    const [value, setValue] = useState('');

    const onChange = useCallback(e=>{
        setValue(e.target.value);
    },[])

    const onSubmit = useCallback(
        e=>{
            setValue('');
            onInsert(value);
            e.preventDefault();
        }
        ,[onInsert,value]
    )
    return(
        <form className='todoList' onSubmit={onSubmit}>
            <input
            onChange={onChange}
            value={value} placeholder='please insert'/>
            <button type="submit">
           
            </button>
        </form>
    )
}

export default Insert;
import React, { useState } from 'react';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [numOftodo, setTodo] = useState(0);
    const [numOfcomplete, setComplete] = useState(0);

    const addTask = (task) => {
        setTasks([...tasks, { text: task, cancelled: false }]);
        setTodo(numOftodo + 1);
    };

    const cancelTask = (idx, taskState) => {
        setTasks(
            tasks.map((task, index) => {
                if (index === idx) {
                    if (taskState) {
                        setComplete(numOfcomplete - 1);
                    } else {
                        setComplete(numOfcomplete + 1);
                    }
                    return { ...task, cancelled: !task.cancelled };
                }
                return task;
            })
        );
    };

    const deleteTask = (idx, taskState) => {
        setTasks(tasks.filter((_, index) => index !== idx));
        setTodo(numOftodo - 1);
        if (taskState) {
            setComplete(numOfcomplete - 1);
        }
    };

    return (
        <div className='App'>
            <Title />
            <Input addTask={addTask} />
            <TaskList tasks={tasks} cancelTask={cancelTask} deleteTask={deleteTask} />
            <NumOfList numOfcomplete={numOfcomplete} numOftodo={numOftodo} />
        </div>
    );
}

function Title() {
    return <h1 className='title'>Todo List</h1>;
}

function Input({ addTask }) {
    const [inputValue, setInputValue] = useState('');

    const clickButton = (event) => {
        addTask(inputValue);
        setInputValue('');
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div className='inputlist'>
            <input
                className='input_todo'
                type='text'
                placeholder='할 일을 입력해주세요'
                value={inputValue}
                onChange={handleInputChange}
            ></input>
            <button className='submit' onClick={clickButton}>
                작성하기
            </button>
        </div>
    );
}

function TaskList({ tasks, cancelTask, deleteTask }) {
    return (
        <div className='tasklist'>
            {tasks.map((task, idx) => (
                <div className='taskStyle' key={idx}>
                    <p className={task.cancelled ? 'cancelled' : ''}>{task.text}</p>
                    <button className='cancel' onClick={() => cancelTask(idx, task.cancelled)}>
                        {task.cancelled ? '취소' : '완료'}
                    </button>
                    <button className='delete' onClick={() => deleteTask(idx, task.cancelled)}>
                        삭제
                    </button>
                    <hr className='hrStyle'></hr>
                </div>
            ))}
        </div>
    );
}

function NumOfList({ numOfcomplete, numOftodo }) {
    return (
        <div className='numOflist'>
            <div>
                {numOfcomplete}/{numOftodo}
            </div>
        </div>
    );
}

export default App;

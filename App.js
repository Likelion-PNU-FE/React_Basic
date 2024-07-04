import React, { useRef, useState } from 'react'; // 이건 기본적으로 있는 거일 듯. react에서 가져온다니까
import './todo.css';

function App() {
    const inputRef = useRef(null); // inputRef는 그냥 내가 붙인 이름. useRef는 엘리먼트에 접근?
    const [arr, setArr] = useState([]); // () 안에 아무것도 없으니 최초 한 번만 실행. arr는 할 일 목록 저장하는 변수. setArr는 arr 상태를 업데이트하는 함수

    function addTask() {
        const newTask = {
            // newTask 객체는 text, completed 두 가지 속성이 있다.
            text: inputRef.current.value, // 속성 이름: 값. 이 이름의 속성에 이 값을 할당함
            completed: false, // false는 할 일이 완료되었나 안 되었나를 보는 불리언 값. 여기서는 false니까 안 된 거를 디폴트로 준다
        };
        setArr((prevArr) => [...prevArr, newTask]); // =>는 setArr 함수가 prevArr라는 인수를 받아 저 배열을 반환한다는 뜻
        // setArr는 위에 나왔듯 arr 상태 업데이트 함수. prevArr는 arr의 현재 상태 변수. 이제 업데이트 해야 함.
        // [...prevArr, newTask]이면 prevArr 요소를 다 들고 와서 배열로 만들고, 그 배열 마지막에 newTask를 추가한다는 뜻
        // 결국 setArr는 prevArr에 newTask를 추가한(업데이트된) 배열
        inputRef.current.value = ''; // 입력 필드 초기화. 이거 안 넣으면 내가 추가한 할 일이 추가 버튼 누르고서도 계속 남아 있음. 다른 할 일도 추가해야 하는데 지우기 귀찮잖아!
    }

    function toggleComplete(index) {
        // 토글은 상태를 유지한다는 뜻. 인덱스를 변수로 받는 함수 toggleComplete
        const newArr = [...arr]; // arr랑 일단은 똑같은 배열인 newArr 만든다
        newArr[index].completed = !newArr[index].completed; // newArr 배열의 index 번째 요소를 ! 써서 true면 false로 f면 t로 바꾼다.
        setArr(newArr); // 이 새 newArr를 setArr 함수에 넣어서 업데이트 시킨다
    }

    function deleteTask(index) {
        const newArr = arr.filter((_, i) => i !== index); // filter 함수는 내가 정해준 것만 가지고 새로운 배열을 만든다
        // _는 왜 있는지 모름. 이거 없으면 삭제가 안 되긴 함. i는 i랑 index랑 같지 않은 애들만 가지고 새로운 배열 newArr를 만드는 거. i==index인 거는 우리가 삭제하려는 할 일
        setArr(newArr);
    }

    const completedCount = arr.filter((task) => task.completed).length;
    const totalCount = arr.length;

    return (
        // 조건?조건이 참일 때 반환될 값:조건이 거짓일 때 반환될 값
        <div className='todoList'>
            <h1>Todo List</h1>
            <div className='writing'>
                <input type='text' ref={inputRef} id='task' placeholder='할 일을 입력해주세요' />
                <div className='blank'>
                    <br />
                </div>
                <button id='Btn' onClick={addTask}>
                    작성하기
                </button>
            </div>
            <div>
                {arr.map((task, index) => (
                    <div key={index} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        <p>{task.text}</p>
                        <button onClick={() => toggleComplete(index)}>{task.completed ? '취소' : '완료'}</button>
                        <button onClick={() => deleteTask(index)}>삭제</button>
                    </div>
                ))}
            </div>
            <div className='count'>
                <p>
                    {completedCount}/{totalCount}
                </p>
            </div>
        </div>
    );
}

export default App;

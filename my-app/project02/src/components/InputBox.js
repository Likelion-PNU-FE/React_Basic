import {useRef} from "react";

export default function InputBox() {
  const nameRef = useRef(null);
  const createTodo = () => {
    fetch("http://localhost:3001/todos/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: nameRef.current.value,
        isComplete: false,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("todo가 추가되었습니다.");
      }
    });

    console.log("입력버튼 누름");
  };

  return (
    <div className="inputBox">
      <input type="text" placeholder="할 일을 입력하세요" ref={nameRef}></input>
      <button className="button-submit" onClick={createTodo}>
        입력
      </button>
    </div>
  );
}

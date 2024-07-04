import {useState} from "react";

export default function Todo({todo}) {
  const [isComplete, setComplete] = useState(todo.isComplete);

  function toggleComplete() {
    fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({...isComplete, isComplete: !isComplete}),
    }).then((res) => {
      if (res.ok) {
        setComplete(!isComplete);
      }
    });
    console.log(todo.isComplete);
  }

  const clickDelete = () => {
    fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "DELETE",
    });
  };

  return (
    <div>
      <h3
        style={
          isComplete
            ? {textDecoration: "line-through"}
            : {textDecoration: "none"}
        }
      >
        {todo.name}
      </h3>
      <button className="button-complete" onClick={toggleComplete}>
        {isComplete ? "취소" : "완료"}
      </button>
      <button className="button-delete" onClick={clickDelete}>
        삭제
      </button>
    </div>
  );
}

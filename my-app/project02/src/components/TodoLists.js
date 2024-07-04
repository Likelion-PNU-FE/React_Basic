import {useEffect, useState} from "react";
import Todo from "../components/Todo";

export default function TodoLists() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTodos(data);
      });
  }, []);

  return (
    <div className="todos">
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </div>
  );
}

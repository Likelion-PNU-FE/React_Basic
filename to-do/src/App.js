import { useEffect, useState } from "react";

function App() {

  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit = () => {
    if (todo.trim()) {
      setList((data) => [...data, todo]);
      setTodo(""); // Clear the input field after adding
    }
  };

  const handleDelete = (index) => {
    setList((data) => data.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log(list);
  }, [list]);

  return (
    <div>
      <header>
        <h1>Todo List</h1>
        <input value={todo} onChange={handleChange} />
        <button onClick={handleSubmit}>작성하기</button>
      </header>
      <main>
        {list.map((item, index) => (
          <div key={index}>
            <h3>{item}</h3>
            <button onClick={() => handleDelete(index)}>삭제</button>
          </div>
        ))}
      </main>
      <footer></footer>
    </div>
  );
}

export default App;

